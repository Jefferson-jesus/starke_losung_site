const assert = require("node:assert/strict");
const { test } = require("node:test");
const load = require("./load-typescript.cjs");

test("only production or an explicitly enabled standalone host can be indexed", (t) => {
  const previous = { vercel: process.env.VERCEL_ENV, index: process.env.SITE_INDEXABLE };
  t.after(() => {
    for (const [name, value] of [["VERCEL_ENV", previous.vercel], ["SITE_INDEXABLE", previous.index]]) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  });
  for (const [vercel, index, expected] of [
    ["preview", "true", false], ["production", "false", true], [undefined, "true", true], [undefined, "false", false]
  ]) {
    if (vercel === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = vercel;
    process.env.SITE_INDEXABLE = index;
    assert.equal(load("lib/indexing.ts").isIndexable, expected);
  }
});
