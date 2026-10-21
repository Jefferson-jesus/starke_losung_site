import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

// Inspect the scripts shipped in prerendered HTML, rather than source imports or
// chunk names. This catches bundler changes that ship FlowDesk on other routes.
const manifest = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const routes = Object.keys(manifest.routes).filter(route => /^\/(pt-BR|en)(\/|$)/.test(route));
const demos = routes.filter(route => route.includes("/demos/"));
assert.equal(routes.length, 32, "26 marketing pages and six demos must remain prerendered");
assert.deepEqual(demos.sort(), [
  "/en/demos/atlas-consulting", "/en/demos/flowdesk", "/en/demos/forma-studio",
  "/pt-BR/demos/atlas-consulting", "/pt-BR/demos/flowdesk", "/pt-BR/demos/forma-studio"
]);

for (const route of routes) {
  const html = readFileSync(`.next/server/app${route}.html`, "utf8");
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(([, url]) => {
    assert.ok(url.startsWith("/_next/"), `Unexpected script URL on ${route}: ${url}`);
    const bytes = readFileSync(`.next/${decodeURIComponent(url.slice("/_next/".length))}`);
    return { url, bytes };
  });
  assert.ok(scripts.length, `${route} must ship client scripts`);
  // The public storage namespace identifies the actual shipped FlowDesk code,
  // including its state/storage module, without relying on a content hash.
  const flowdesk = scripts.filter(({ bytes }) => bytes.includes("starke.flowdesk.demo."));
  assert.equal(flowdesk.length > 0, route.endsWith("/demos/flowdesk"),
    `${route}: FlowDesk code found in ${flowdesk.map(({ url }) => url).join(", ") || "no scripts"}`);
  if (flowdesk.length) {
    for (const { url, bytes } of flowdesk) {
      console.log(`${route}: ${url} (${bytes.length} bytes / ${gzipSync(bytes).length} gzip)`);
    }
  }
}
console.log("Bundle isolation passed: FlowDesk code only on its two routes; 32 static pages preserved.");
