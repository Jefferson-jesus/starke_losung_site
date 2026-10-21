import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Run against an explicitly started production server. No contact actions are used.
const base = process.env.PREVIEW_BASE_URL || "http://127.0.0.1:3000";
const evidence = process.env.PREVIEW_EVIDENCE_DIR || "test-results/previews";
await mkdir("public/portfolio", { recursive: true });
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch();
const manifest = { capturedAt: new Date().toISOString(), base, captures: [] };
try {
  for (const width of [1440, 360]) {
    const context = await browser.newContext({ viewport: { width, height: width === 360 ? 800 : 960 }, deviceScaleFactor: 1 });
    try {
      for (const slug of ["atlas-consulting", "forma-studio", "flowdesk"]) {
        const page = await context.newPage();
        const response = await page.goto(`${base}/pt-BR/demos/${slug}`, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        for (const img of await page.locator("img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el => el.decode());
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug} at ${width}px`);
        if (width === 1440) await page.screenshot({ path: `public/portfolio/${slug}.png` });
        await page.screenshot({ path: `${evidence}/${slug}-${width}-full.png`, fullPage: true });
        manifest.captures.push({ slug, width, url: page.url() });
        await page.close();
      }
      for (const locale of ["pt-BR", "en"]) {
        for (const route of ["", "/portfolio"]) {
          const page = await context.newPage();
          const response = await page.goto(`${base}/${locale}${route}`, { waitUntil: "networkidle" });
          assert.equal(response.status(), 200);
          await page.evaluate(() => document.fonts.ready);
          for (const img of await page.locator("img").all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate(el => el.decode());
          }
          await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
          const name = `${locale}-${route ? "portfolio" : "home"}`;
          await page.screenshot({ path: `${evidence}/${name}-${width}-full.png`, fullPage: true });
          manifest.captures.push({ slug: name, width, url: page.url() });
          await page.close();
        }
      }
    } finally { await context.close(); }
  }
  // Isolated, read-only external session: navigate and capture; never click links.
  const external = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
  try {
    const page = await external.newPage();
    const url = "https://www.jrdsolucoesemanutencoes.com.br/";
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    assert.equal(response.status(), 200, "JRD capture requires a successful page");
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: "public/portfolio/jrd.png" });
    await page.screenshot({ path: `${evidence}/jrd-1440-full.png`, fullPage: true });
    manifest.captures.push({ slug: "jrd", width: 1440, url: page.url(), readOnly: true });
  } finally { await external.close(); }
  await writeFile(`${evidence}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Captured 4 real previews and ${manifest.captures.length} visual records in ${evidence}`);
} finally { await browser.close(); }
