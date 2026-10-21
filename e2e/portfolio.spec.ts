import { expect, test } from "@playwright/test";
import { siteConfig } from "../site.config";

for (const locale of ["pt-BR", "en"]) {
  for (const route of ["", "/portfolio"]) {
    test(`${locale}${route || "/"} shows one published project and three working demo cards`, async ({ page }) => {
      await page.goto(`/${locale}${route}`);
      const cards = page.getByRole("article").filter({ has: page.getByRole("heading", { name: /JRD Soluções e Manutenções|Atlas Consulting|Forma Studio|FlowDesk/, exact: true }) });
      await expect(cards).toHaveCount(4);
      await expect(cards.getByText(locale === "pt-BR" ? "Projeto publicado" : "Published project", { exact: true })).toHaveCount(1);
      await expect(cards.getByText(locale === "pt-BR" ? "Demonstração autoral" : "Original demo", { exact: true })).toHaveCount(3);
      const jrd = cards.filter({ has: page.getByRole("heading", { name: "JRD Soluções e Manutenções", exact: true }) }).getByRole("link");
      await expect(jrd).toHaveAttribute("href", "https://www.jrdsolucoesemanutencoes.com.br/");
      await expect(jrd).toHaveAttribute("target", "_blank");
      await expect(jrd).toHaveAttribute("rel", /noopener/);
      for (const [name, slug] of [["Atlas Consulting", "atlas-consulting"], ["Forma Studio", "forma-studio"], ["FlowDesk", "flowdesk"]]) {
        const link = cards.filter({ has: page.getByRole("heading", { name, exact: true }) }).getByRole("link");
        await expect(link).toHaveAttribute("href", `/${locale}/demos/${slug}`);
      }
      for (const img of await cards.getByRole("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveAttribute("alt", /.+/);
        await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
  for (const [name, slug] of [["Atlas Consulting", "atlas-consulting"], ["Forma Studio", "forma-studio"], ["FlowDesk", "flowdesk"]]) {
    test(`${locale} ${name} keeps localized contact, keyboard return and isolated colors`, async ({ page }) => {
      await page.goto(`/${locale}/demos/${slug}?mode=standard`);
      const colors = () => page.getByRole("main").evaluate(el => ({ foreground: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }));
      const standard = await colors();
      await page.goto(`/${locale}/demos/${slug}?mode=premium`);
      expect(await colors()).toEqual(standard);
      const ctas = page.locator('a[href^="https://wa.me/"]');
      expect(await ctas.count()).toBeGreaterThan(0);
      for (const cta of await ctas.all()) {
        const url = new URL((await cta.getAttribute("href"))!);
        expect(url.pathname).toBe(`/${siteConfig.whatsappNumber.replace(/\D/g, "")}`);
        const message = url.searchParams.get("text")!;
        expect(message).toContain(name);
        expect(message).toContain(locale === "pt-BR" ? "Gostaria de um orçamento" : "I'd like a quote");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const back = page.getByRole("link", { name: locale === "pt-BR" ? "Voltar ao portfólio" : "Back to portfolio" });
      await back.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${locale}/portfolio$`));
    });
  }
}

test("Forma filters conceptual projects and restores them with keyboard access", async ({ page }) => {
  await page.goto("/pt-BR/demos/forma-studio");
  const projects = page.locator("#projects article");
  await expect(projects).toHaveCount(4);
  await expect(projects.getByText("Modelo conceitual", { exact: true })).toHaveCount(4);
  const all = page.getByRole("button", { name: "Todos", exact: true });
  const commercial = page.getByRole("button", { name: "Comerciais", exact: true });
  await commercial.click();
  await expect(commercial).toHaveAttribute("aria-pressed", "true");
  await expect(projects).toHaveCount(2);
  await expect(projects.getByRole("heading")).toHaveText(["Galeria Terra", "Café Orla"]);
  await all.click();
  await expect(projects).toHaveCount(4);
  await all.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Residenciais", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(projects.getByRole("heading")).toHaveText(["Casa Pátio", "Refúgio da Serra"]);
  await page.keyboard.press("Tab");
  await expect(commercial).toBeFocused();
  await page.keyboard.press("Space");
  await expect(projects.getByRole("heading")).toHaveText(["Galeria Terra", "Café Orla"]);
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Enter");
  await expect(all).toHaveAttribute("aria-pressed", "true");
  await expect(projects).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const img of await projects.getByRole("img").all()) {
    await expect(img).toHaveAttribute("alt", /.+/);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.screenshot({ path: test.info().outputPath("forma-gallery.png"), fullPage: true });
});

test("Forma localizes its content, anchors and real quote destination", async ({ page }) => {
  await page.goto("/pt-BR/demos/forma-studio");
  await expect(page).toHaveTitle(/Forma Studio.*Demonstração autoral/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Espaços para");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await page.waitForLoadState("load");
  await expect(page).toHaveTitle(/Forma Studio.*Original demo/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Spaces for");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("main")).toHaveCount(1);
  await page.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page.locator("#services")).toBeInViewport();
  const quote = page.getByRole("link", { name: "Request a similar project", exact: true });
  const href = await quote.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  expect(new URL(href!).searchParams.get("text")).toContain("Forma Studio");
  const ctas = page.locator('main a[href^="https://wa.me/"]');
  expect(await ctas.count()).toBeGreaterThan(0);
  for (const cta of await ctas.all()) await expect(cta).toHaveAttribute("href", href!);
  await page.getByRole("button", { name: "Commercial", exact: true }).click();
  await expect(page.locator("#projects article")).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("Atlas identifies the demo, opens its FAQ and returns to the portfolio", async ({ page }) => {
  await page.goto("/pt-BR/demos/atlas-consulting");
  await expect(page.getByRole("navigation", { name: "Barra de demonstração" })).toBeVisible();
  await expect(page.getByText("Empresa fictícia", { exact: false })).toBeVisible();
  const question = page.locator("summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(page.locator("details").first().locator("p")).toBeVisible();
  await page.getByRole("link", { name: "Voltar ao portfólio" }).click();
  await expect(page).toHaveURL(/\/pt-BR\/portfolio$/);
  await expect(page.getByRole("heading", { name: "Atlas Consulting" })).toBeVisible();
});

test("an explicit Portuguese marketing route wins over English preferences", async ({ page }) => {
  await page.goto("/pt-BR/contact");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("button", { name: "Continuar no WhatsApp" })).toBeVisible();
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page).toHaveURL(/\/pt-BR\/contact$/);
});

test("Atlas locale links, anchors and quote destinations work without marketing chrome", async ({ page }) => {
  await page.goto("/pt-BR/demos/atlas-consulting");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/demos\/atlas-consulting$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator("#services")).toBeInViewport();
  const quote = page.getByRole("link", { name: "Request a similar project", exact: true });
  const href = await quote.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  expect(new URL(href!).searchParams.get("text")).toContain("Atlas Consulting");
  const ctas = page.locator('main a[href^="https://wa.me/"]');
  expect(await ctas.count()).toBeGreaterThan(0);
  for (const cta of await ctas.all()) await expect(cta).toHaveAttribute("href", href!);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath("atlas.png"), fullPage: true });
});

test("unknown demo slugs return 404", async ({ page }) => {
  const response = await page.goto("/en/demos/not-a-demo");
  expect(response?.status()).toBe(404);
});

test("Atlas colors do not depend on the marketing visual mode", async ({ page }) => {
  await page.goto("/en/demos/atlas-consulting?mode=standard");
  const readColors = () => page.getByRole("main").evaluate((el) => {
    const style = getComputedStyle(el);
    return { color: style.color, background: style.backgroundColor };
  });
  const standard = await readColors();
  await page.goto("/en/demos/atlas-consulting?mode=premium");
  expect(await readColors()).toEqual(standard);
});
