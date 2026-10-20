const assert = require("node:assert/strict");
const { test } = require("node:test");
const load = require("./load-typescript.cjs");

const lead = {
  name: "João & Maria", email: "joao@example.com", country: "Brasil",
  projectType: "Sistema sob medida", message: "Preciso de um sistema.\nCom integração + relatórios."
};

test("a Portuguese quote preserves all form fields in the WhatsApp message", () => {
  const { getWhatsAppFormUrl } = load("lib/whatsapp.ts");
  const url = new URL(getWhatsAppFormUrl("+55 (11) 97979-5088", "pt-BR", lead));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5511979795088");
  const text = url.searchParams.get("text");
  for (const value of Object.values(lead)) assert.ok(text.includes(value), `Missing field: ${value}`);
  assert.ok(text.includes("Nome: João & Maria"));
  assert.ok(text.includes("Tipo de projeto: Sistema sob medida"));
});

test("an international quote uses English labels without corrupting punctuation", () => {
  const { getWhatsAppFormUrl } = load("lib/whatsapp.ts");
  const url = new URL(getWhatsAppFormUrl("+5511979795088", "en", { ...lead, message: "Website? budget=5000 & CRM + payments" }));
  const text = url.searchParams.get("text");
  assert.ok(text.includes("Name: João & Maria"));
  assert.ok(text.includes("Project type: Sistema sob medida"));
  assert.ok(text.includes("Website? budget=5000 & CRM + payments"));
});

test("an invalid destination cannot open a different website or an empty chat", () => {
  const { getWhatsAppFormUrl } = load("lib/whatsapp.ts");
  assert.throws(() => getWhatsAppFormUrl("https://example.com", "en", lead));
  assert.throws(() => getWhatsAppFormUrl("123", "en", lead));
});
