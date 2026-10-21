const assert = require("node:assert/strict");
const { test } = require("node:test");
const load = require("./load-typescript.cjs");

test("quote totals use integer cents", () => {
  const { calculateQuoteTotal } = load("components/demos/flowdesk/model.ts");
  assert.equal(calculateQuoteTotal([{id:'i1', description:'Service', quantity:3, unitPriceCents:12990}]), 38970);
  assert.equal(calculateQuoteTotal([{id:'i1', description:'Service', quantity:1000, unitPriceCents:0}]), 0);
});

const client = { id:"c1", name:"Demo Person", company:"Fictional Company", email:"person@example.com" };
const quote = {
  id:"q1", clientId:"c1", title:"Service quote", status:"draft",
  items:[{id:"i1", description:"Service", quantity:3, unitPriceCents:12990}]
};
const fixture = () => structuredClone({version:1, clients:[client], quotes:[quote]});

test("stored states recover from malformed or invalid data with a fresh localized seed", () => {
  const { parseDemoState } = load("components/demos/flowdesk/storage.ts");
  const { createSeedState } = load("components/demos/flowdesk/seed.ts");
  const invalidStates = [null, "{bad", "null", "[]", "{}"];
  const invalid = (change) => { const state = fixture(); change(state); invalidStates.push(JSON.stringify(state)); };
  invalid(s => { s.version = 2; });
  invalid(s => { s.quotes[0].status = "paid"; });
  invalid(s => { s.quotes[0].items[0].unitPriceCents = -1; });
  invalid(s => { s.quotes[0].items[0].unitPriceCents = Number.MAX_SAFE_INTEGER + 1; });
  invalid(s => { s.quotes[0].items[0].quantity = 1.5; });
  invalid(s => { s.quotes[0].items[0].quantity = 1001; });
  invalid(s => { s.quotes[0].items[0].unitPriceCents = Number.MAX_SAFE_INTEGER; });
  invalid(s => { s.quotes[0].clientId = "missing"; });
  invalid(s => { s.quotes[0].items = []; });
  invalid(s => { s.quotes[0].items.push({...s.quotes[0].items[0]}); });
  invalid(s => { s.clients.push({...s.clients[0]}); });
  invalid(s => { s.quotes.push({...s.quotes[0]}); });
  invalid(s => { s.clients[0].name = 42; });
  invalid(s => { s.quotes[0].items = [null]; });
  for (const locale of ["pt-BR", "en"]) {
    for (const raw of invalidStates) {
      const recovered = parseDemoState(raw, locale);
      assert.deepEqual(recovered, createSeedState(locale), `${locale}: ${raw}`);
      assert.notStrictEqual(recovered, parseDemoState(raw, locale));
    }
  }
});

test("valid stored states round-trip without interpreting entered text", () => {
  const { parseDemoState } = load("components/demos/flowdesk/storage.ts");
  const state = fixture();
  state.clients[0].name = '<img src=x onerror="alert(1)">';
  assert.deepEqual(parseDemoState(JSON.stringify(state), "en"), state);
  assert.deepEqual(parseDemoState('{"version":1,"clients":[],"quotes":[]}', "en"), {version:1, clients:[], quotes:[]});
});

test("client and quote upserts edit IDs without duplicates or mutating inputs", () => {
  const { applyDemoAction } = load("components/demos/flowdesk/model.ts");
  const original = fixture();
  const editedClient = {...client, name:"Edited name"};
  let state = applyDemoAction(original, {type:"client/upsert", payload:editedClient});
  assert.deepEqual(state.clients, [editedClient]);
  assert.deepEqual(original, fixture());
  editedClient.name = "Changed after dispatch";
  assert.equal(state.clients[0].name, "Edited name");
  state = applyDemoAction(state, {type:"client/upsert", payload:{...client, id:"c2"}});
  assert.equal(state.clients.length, 2);
  const editedQuote = {...structuredClone(quote), title:"Edited quote"};
  state = applyDemoAction(state, {type:"quote/upsert", payload:editedQuote});
  assert.equal(state.quotes.length, 1);
  assert.equal(state.quotes[0].title, "Edited quote");
  editedQuote.items[0].quantity = 999;
  assert.equal(state.quotes[0].items[0].quantity, 3);
  state = applyDemoAction(state, {type:"quote/upsert", payload:{...quote, id:"q2"}});
  assert.equal(state.quotes.length, 2);
});

test("quote updates reject missing clients, invalid items and unknown statuses", () => {
  const { applyDemoAction } = load("components/demos/flowdesk/model.ts");
  for (const payload of [
    {...quote, clientId:"missing"}, {...quote, status:"paid"}, {...quote, items:[]},
    {...quote, items:[{...quote.items[0], quantity:0}]},
    {...quote, items:[{...quote.items[0], unitPriceCents:Infinity}]}
  ]) {
    assert.throws(() => applyDemoAction(fixture(), {type:"quote/upsert", payload}));
  }
  assert.throws(() => applyDemoAction(fixture(), {type:"quote/status", payload:{id:"missing", status:"sent"}}));
  assert.throws(() => applyDemoAction(fixture(), {type:"quote/status", payload:{id:"q1", status:"paid"}}));
  assert.throws(() => applyDemoAction(fixture(), {type:"client/upsert", payload:{...client, name:42}}));
});

test("dashboard counts records and sums only approved quote totals", () => {
  const { applyDemoAction, getDashboardStats } = load("components/demos/flowdesk/model.ts");
  const original = fixture();
  const sent = applyDemoAction(original, {type:"quote/status", payload:{id:"q1", status:"sent"}});
  assert.deepEqual(getDashboardStats(sent), {clientCount:1, quoteCount:1, approvedTotalCents:0});
  let state = applyDemoAction(sent, {type:"quote/status", payload:{id:"q1", status:"approved"}});
  assert.equal(original.quotes[0].status, "draft");
  assert.deepEqual(getDashboardStats(state), {clientCount:1, quoteCount:1, approvedTotalCents:38970});
  state = applyDemoAction(state, {type:"quote/upsert", payload:{...quote, id:"q2", status:"approved"}});
  assert.deepEqual(getDashboardStats(state), {clientCount:1, quoteCount:2, approvedTotalCents:77940});
});

test("approved totals cannot overflow during updates, stats or storage recovery", () => {
  const { applyDemoAction, getDashboardStats } = load("components/demos/flowdesk/model.ts");
  const { parseDemoState } = load("components/demos/flowdesk/storage.ts");
  const { createSeedState } = load("components/demos/flowdesk/seed.ts");
  const state = fixture();
  state.quotes[0] = {...quote, status:"approved", items:[{...quote.items[0], quantity:1, unitPriceCents:Number.MAX_SAFE_INTEGER}]};
  const second = {...quote, id:"q2", status:"approved"};
  assert.throws(() => applyDemoAction(state, {type:"quote/upsert", payload:second}));
  state.quotes.push(second);
  assert.throws(() => getDashboardStats(state));
  assert.deepEqual(parseDemoState(JSON.stringify(state), "en"), createSeedState("en"));
});

test("localized seeds are valid fresh independent records", () => {
  const { createSeedState } = load("components/demos/flowdesk/seed.ts");
  const { parseDemoState } = load("components/demos/flowdesk/storage.ts");
  const pt = createSeedState("pt-BR");
  const en = createSeedState("en");
  for (const [locale, state] of [["pt-BR", pt], ["en", en]]) {
    assert.equal(state.version, 1);
    assert.ok(state.clients.length > 0);
    assert.ok(state.quotes.length > 0);
    assert.deepEqual(parseDemoState(JSON.stringify(state), locale), state);
  }
  assert.notEqual(pt.quotes[0].title, en.quotes[0].title);
  pt.quotes[0].items[0].quantity = 999;
  pt.clients[0].name = "Edited";
  assert.notEqual(createSeedState("pt-BR").clients[0].name, "Edited");
  assert.notEqual(en.quotes[0].items[0].quantity, 999);
});

test("storage uses independent locale keys and recovers from blocked writes", () => {
  const { getDemoStorageKey, saveDemoState } = load("components/demos/flowdesk/storage.ts");
  const records = new Map();
  const storage = {setItem(key, value) { records.set(key, value); }};
  assert.equal(getDemoStorageKey("pt-BR"), "starke.flowdesk.demo.pt-BR.v1");
  assert.equal(getDemoStorageKey("en"), "starke.flowdesk.demo.en.v1");
  assert.equal(saveDemoState(storage, "pt-BR", fixture()), true);
  const english = {...fixture(), clients:[{...client, name:"English data"}]};
  assert.equal(saveDemoState(storage, "en", english), true);
  assert.deepEqual(JSON.parse(records.get("starke.flowdesk.demo.pt-BR.v1")), fixture());
  assert.deepEqual(JSON.parse(records.get("starke.flowdesk.demo.en.v1")), english);
  assert.equal(saveDemoState({setItem() { throw new Error("Storage blocked"); }}, "en", fixture()), false);
});

test("money input accepts only safe nonnegative decimal amounts", () => {
  const { parseMoneyInput } = load("components/demos/flowdesk/model.ts");
  assert.equal(parseMoneyInput('129,90'), 12990);
  assert.equal(parseMoneyInput('129.90'), 12990);
  assert.equal(parseMoneyInput('-1.00'), null);
  assert.equal(parseMoneyInput('1e4'), null);
  for (const [input, expected] of [["0", 0], ["12.3", 1230], ["90071992547409.91", 9007199254740991]]) {
    assert.equal(parseMoneyInput(input), expected, input);
  }
  for (const input of ["", " ", " 1.00", "1.00 ", "+1", ".99", "1.", "1.234", "1,234.00", "1 234", "NaN", "Infinity", "90071992547409.92", "9".repeat(400)]) {
    assert.equal(parseMoneyInput(input), null, input);
  }
});

test("quote totals reject invalid quantities, cents and overflow", () => {
  const { calculateQuoteTotal } = load("components/demos/flowdesk/model.ts");
  assert.throws(() => calculateQuoteTotal([{id:'i1', description:'Service', quantity:0, unitPriceCents:100}]));
  for (const quantity of [-1, 1.5, 1001, NaN, Infinity, "2"]) {
    assert.throws(() => calculateQuoteTotal([{id:"i1", description:"Service", quantity, unitPriceCents:100}]));
  }
  for (const unitPriceCents of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, "100"]) {
    assert.throws(() => calculateQuoteTotal([{id:"i1", description:"Service", quantity:1, unitPriceCents}]));
  }
  assert.throws(() => calculateQuoteTotal([{id:"i1", description:"Service", quantity:2, unitPriceCents:Number.MAX_SAFE_INTEGER}]));
  assert.throws(() => calculateQuoteTotal([
    {id:"i1", description:"Service", quantity:1, unitPriceCents:Number.MAX_SAFE_INTEGER},
    {id:"i2", description:"Service", quantity:1, unitPriceCents:1}
  ]));
});

test("money input rejects trailing line terminators", () => {
  const { parseMoneyInput } = load("components/demos/flowdesk/model.ts");
  for (const input of ["129.90\n", "129.90\r", "129.90\u2028", "129.90\u2029"]) {
    assert.equal(parseMoneyInput(input), null, JSON.stringify(input));
  }
});
