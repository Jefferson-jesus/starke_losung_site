const assert = require("node:assert/strict");
const { test } = require("node:test");
const load = require("./load-typescript.cjs");

test("the sitemap includes maintenance in both languages with alternate URLs", () => {
  const entries = load("app/sitemap.ts").default();
  const entry = entries.find((item) => item.url.endsWith("/en/services/maintenance-growth"));
  assert.ok(entry, "Maintenance service must be discoverable");
  assert.ok(entries.some((item) => item.url.endsWith("/pt-BR/services/maintenance-growth")));
  assert.ok(entry.alternates.languages["pt-BR"].endsWith("/pt-BR/services/maintenance-growth"));
});
