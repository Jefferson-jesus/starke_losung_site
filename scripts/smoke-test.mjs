import assert from "node:assert/strict";

const base = process.env.SMOKE_BASE_URL || "http://localhost:3000";
const pages = ["", "/services", "/services/custom-software", "/services/landing-pages", "/services/business-websites", "/services/seo-performance", "/services/maintenance-growth", "/portfolio", "/pricing", "/about", "/contact", "/privacy", "/terms"];
let count = 0;
for (const locale of ["en", "pt-BR"]) {
  for (const page of pages) {
    const response = await fetch(`${base}/${locale}${page}`);
    assert.equal(response.status, 200, `${locale}${page}`);
    const html = await response.text();
    assert.ok(html.includes(`lang="${locale}"`), `Correct document language for ${locale}${page}`);
    assert.ok(html.includes("<h1"), `Page heading for ${locale}${page}`);
    assert.ok(!html.includes("token-placeholder"), "No placeholder anti-spam field");
    if (page === "/contact" || page === "") {
      assert.ok(html.includes(locale === "pt-BR" ? "Continuar no WhatsApp" : "Continue on WhatsApp"));
      assert.ok(html.includes('name="projectType"'));
    }
    count++;
  }
}
for (const [language, expected] of [["pt-BR,pt;q=0.9,en;q=0.8", "/pt-BR"], ["en-US,en;q=0.9", "/en"]]) {
  const response = await fetch(base, { redirect: "manual", headers: { "accept-language": language } });
  assert.ok([307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), base).pathname, expected);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.ok(sitemap.includes("/en/services/custom-software"));
assert.ok(sitemap.includes("/pt-BR/services/maintenance-growth"));
assert.equal((await fetch(`${base}/en/does-not-exist`)).status, 404);
assert.equal((await fetch(`${base}/api/contact`, { method: "POST" })).status, 404);
console.log(`Smoke test passed: ${count} localized pages, root language detection, sitemap and 404 responses.`);
