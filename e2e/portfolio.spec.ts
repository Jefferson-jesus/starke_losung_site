import { expect, test } from "@playwright/test";

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
