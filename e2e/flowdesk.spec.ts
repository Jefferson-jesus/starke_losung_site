import { expect, test, type Page } from "@playwright/test";

const key = "starke.flowdesk.demo.pt-BR.v1";
for (const panel of ["clients", "quotes"] as const) {
  test(`filtered ${panel} editor restores keyboard focus when the renamed card disappears`, async ({ page }) => {
    await page.goto("/pt-BR/demos/flowdesk");
    const client = panel === "clients";
    await page.getByRole("button", { name: client ? "Clientes" : "Orçamentos", exact: true }).click();
    const firstCard = page.getByRole("article").first();
    const original = await firstCard.getAttribute("aria-label");
    const search = page.getByLabel(client ? "Buscar clientes" : "Buscar orçamentos");
    await search.fill(original!);
    await firstCard.getByRole("button", { name: "Editar" }).focus();
    await page.keyboard.press("Enter");
    await page.getByLabel(client ? "Nome" : "Título do orçamento", { exact: true }).fill("Registro renomeado");
    const save = page.getByRole("button", { name: client ? "Salvar cliente" : "Salvar orçamento", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("article")).toHaveCount(0);
    await expect(search).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: client ? "Novo cliente" : "Novo orçamento", exact: true })).toBeFocused();
  });
}
async function openClients(page: Page) {
  await page.getByRole("button", { name: "Clientes", exact: true }).click();
}
async function addClient(page: Page, name = "Cliente Local Teste") {
  await openClients(page);
  await page.getByRole("button", { name: "Novo cliente", exact: true }).click();
  await expect(page.getByLabel("Nome", { exact: true })).toBeFocused();
  await page.getByLabel("Nome", { exact: true }).fill(name);
  await page.getByLabel("Empresa", { exact: true }).fill("Empresa Local Teste");
  await page.getByLabel("E-mail", { exact: true }).fill("local@example.com");
  await page.getByRole("button", { name: "Salvar cliente", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Novo cliente", exact: true })).toBeFocused();
}

test("FlowDesk creates, totals, approves, edits, reloads and restores local records", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => requests.push(request.url() + (request.postData() ?? "")));
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/pt-BR/demos/flowdesk");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Visão geral");
  await addClient(page);
  await page.getByRole("button", { name: "Orçamentos", exact: true }).click();
  await page.getByRole("button", { name: "Novo orçamento", exact: true }).click();
  await page.getByLabel("Título do orçamento").fill("Projeto Local Teste");
  await page.getByLabel("Cliente", { exact: true }).selectOption({ label: "Cliente Local Teste · Empresa Local Teste" });
  await page.getByLabel("Descrição 1", { exact: true }).fill("Design Local Teste");
  await page.getByLabel("Quantidade 1", { exact: true }).fill("2");
  await page.getByLabel("Valor unitário 1", { exact: true }).fill("129,90");
  await page.getByRole("button", { name: "Adicionar item" }).click();
  await page.getByLabel("Descrição 2", { exact: true }).fill("Revisão Local Teste");
  await page.getByLabel("Valor unitário 2", { exact: true }).fill("50,25");
  await expect(page.getByRole("dialog")).toContainText(/310,05/);
  await page.screenshot({ path: test.info().outputPath("flowdesk-editor.png"), fullPage: true });
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  const quote = page.getByRole("article", { name: "Projeto Local Teste", exact: true });
  await expect(quote).toContainText(/310,05/);
  await quote.getByLabel("Status").selectOption("approved");
  await page.getByRole("button", { name: "Visão geral", exact: true }).click();
  await expect(page.getByTestId("approved-total")).toContainText(/2\.710,05/);
  await page.getByRole("button", { name: "Orçamentos", exact: true }).click();
  await quote.getByRole("button", { name: "Editar" }).click();
  await page.getByLabel("Quantidade 1", { exact: true }).fill("3");
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  await expect(quote).toContainText(/439,95/);
  await page.reload();
  await expect(page.getByTestId("approved-total")).toContainText(/2\.839,95/);
  await openClients(page);
  await expect(page.getByRole("article", { name: "Cliente Local Teste", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Orçamentos", exact: true }).click();
  await page.getByLabel("Buscar orçamentos").fill("Projeto Local Teste");
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(quote).toContainText(/439,95/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath("flowdesk-quotes.png"), fullPage: true });
  expect(requests.filter(value => /Local.Teste|local%40example|local@example/.test(value))).toEqual([]);
  expect(errors).toEqual([]);
  page.once("dialog", dialog => dialog.dismiss());
  await page.getByRole("button", { name: "Restaurar demonstração" }).click();
  await expect(quote).toBeVisible();
  page.once("dialog", dialog => dialog.accept());
  await page.getByRole("button", { name: "Restaurar demonstração" }).click();
  await expect(page.getByTestId("approved-total")).toContainText(/2\.400,00/);
  await page.reload();
  await openClients(page);
  await expect(page.getByRole("article", { name: "Cliente Local Teste", exact: true })).toHaveCount(0);
});

test("saved client survives first hydration and locale datasets remain independent", async ({ page }) => {
  await page.addInitScript(({ storageKey }) => {
    if (!localStorage.getItem(storageKey)) localStorage.setItem(storageKey, JSON.stringify({ version: 1, clients: [{ id: "saved", name: "Persistido <img src=x onerror=alert(1)>", company: "Salvo", email: "saved@example.com" }], quotes: [] }));
  }, { storageKey: key });
  await page.goto("/pt-BR/demos/flowdesk");
  await openClients(page);
  await expect(page.getByText("Persistido <img src=x onerror=alert(1)>", { exact: true })).toBeVisible();
  await expect(page.getByRole("main").locator("img")).toHaveCount(0);
  await expect.poll(() => page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)!).clients[0].id, key)).toBe("saved");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Overview");
  await expect(page.getByTestId("approved-total")).toContainText("$1,200.00");
  await page.getByRole("button", { name: "Clients", exact: true }).click();
  await expect(page.getByText("Persistido", { exact: false })).toHaveCount(0);
  await page.getByRole("link", { name: "PT", exact: true }).click();
  await openClients(page);
  await expect(page.getByText("Persistido <img src=x onerror=alert(1)>", { exact: true })).toBeVisible();
});

test("blocked storage keeps the demo usable in this session", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Blocked", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); };
  });
  await page.goto("/pt-BR/demos/flowdesk");
  await expect(page.getByRole("status")).toContainText("Somente nesta sessão");
  await addClient(page);
  await expect(page.getByRole("article", { name: "Cliente Local Teste", exact: true })).toBeVisible();
});

test("malformed storage recovers seed and editors validate with keyboard focus", async ({ page }) => {
  await page.addInitScript(storageKey => localStorage.setItem(storageKey, "{broken"), key);
  await page.goto("/pt-BR/demos/flowdesk");
  await expect(page.getByTestId("approved-total")).toContainText(/2\.400,00/);
  await openClients(page);
  const newClient = page.getByRole("button", { name: "Novo cliente", exact: true });
  await newClient.focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Salvar cliente", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(newClient).toBeFocused();
  await page.getByRole("button", { name: "Orçamentos", exact: true }).click();
  await page.getByRole("button", { name: "Novo orçamento", exact: true }).click();
  await page.getByLabel("Título do orçamento").fill("Inválido");
  await page.getByLabel("Descrição 1", { exact: true }).fill("Item");
  await page.getByLabel("Valor unitário 1", { exact: true }).fill("1.234,56");
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toBeVisible();
  await page.getByLabel("Valor unitário 1", { exact: true }).fill("10");
  await page.getByLabel("Quantidade 1", { exact: true }).fill("0");
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel("Quantidade 1", { exact: true }).fill("1");
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("dashboard is responsive, fictional, local-only and separates the commercial CTA", async ({ page }) => {
  await page.goto("/pt-BR/demos/flowdesk");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Visão geral");
  await expect(page.getByText(/Os registros são fictícios/)).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Salvo neste navegador");
  const cta = page.getByRole("link", { name: "Solicitar projeto semelhante", exact: true });
  const href = await cta.getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain("FlowDesk");
  expect(href).not.toContain("Marina");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath("flowdesk-dashboard.png"), fullPage: true });
});

test("editors preserve cents, edit clients and focus newly added items", async ({ page }) => {
  await page.addInitScript(storageKey => {
    if (!localStorage.getItem(storageKey)) localStorage.setItem(storageKey, JSON.stringify({ version: 1, clients: [{ id: "large-client", name: "Cliente Limite", company: "Empresa", email: "limit@example.com" }], quotes: [{ id: "large-quote", clientId: "large-client", title: "Precisão", status: "draft", items: [{ id: "large-item", description: "Item de precisão", quantity: 1, unitPriceCents: 9007199254740990 }] }] }));
  }, key);
  await page.goto("/pt-BR/demos/flowdesk");
  await openClients(page);
  const client = page.getByRole("article", { name: "Cliente Limite", exact: true });
  await client.getByRole("button", { name: "Editar" }).click();
  await page.getByLabel("Nome", { exact: true }).fill("Cliente Atualizado");
  await page.getByRole("button", { name: "Salvar cliente", exact: true }).click();
  await page.getByLabel("Buscar clientes").fill("Atualizado");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Orçamentos", exact: true }).click();
  await page.getByRole("article", { name: "Precisão", exact: true }).getByRole("button", { name: "Editar" }).click();
  await expect(page.getByLabel("Valor unitário 1", { exact: true })).toHaveValue("90071992547409.90");
  await page.getByLabel("Valor unitário 1", { exact: true }).fill("90071992547409.91");
  await expect(page.getByRole("dialog")).toContainText("90.071.992.547.409,91");
  await page.getByLabel("Valor unitário 1", { exact: true }).fill("90071992547409.90");
  await page.getByRole("button", { name: "Adicionar item" }).click();
  await expect(page.getByLabel("Descrição 2", { exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Remover item 2" }).click();
  await page.getByRole("button", { name: "Salvar orçamento", exact: true }).click();
  await expect.poll(() => page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)!).quotes[0].items[0].unitPriceCents, key)).toBe(9007199254740990);
  await page.reload();
  await openClients(page);
  await expect(page.getByRole("article", { name: "Cliente Atualizado", exact: true })).toBeVisible();
});
