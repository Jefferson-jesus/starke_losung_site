const assert = require("node:assert/strict");
const { test } = require("node:test");
const vm = require("node:vm");
const load = require("./load-typescript.cjs");

function boot(search, stored, blocked = false) {
  const context = {
    URLSearchParams, location: { search }, document: { documentElement: { dataset: {} } },
    localStorage: { getItem() { if (blocked) throw new Error("Storage disabled"); return stored; } }
  };
  vm.runInNewContext(load("lib/site-mode.ts").getModeInitScript("standard"), context);
  return context.document.documentElement.dataset.mode;
}

test("a mode URL works even when browser storage is blocked", () => {
  assert.equal(boot("?mode=premium", null, true), "premium");
});

test("explicit mode wins over a saved preference before the page paints", () => {
  assert.equal(boot("?mode=standard", "premium"), "standard");
  assert.equal(boot("", "premium"), "premium");
  assert.equal(boot("?mode=unexpected", null), "standard");
});
