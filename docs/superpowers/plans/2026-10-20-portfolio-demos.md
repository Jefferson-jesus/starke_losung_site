# Portfolio and Interactive Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar no portfólio o trabalho real da JRD e três demonstrações autorais funcionais para vender desenvolvimento de sistemas e sites.

**Architecture:** Manter um único projeto Next.js e separar o layout comercial dos modelos por grupos de rotas, preservando as URLs atuais. Um catálogo compartilhado alimenta as duas exibições de portfólio. FlowDesk tem modelo de dados puro, armazenamento local e componentes próprios, carregados apenas na sua rota.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, next-intl, Node test runner. Preservar dependências de execução; adicionar `@playwright/test` como ferramenta de desenvolvimento para testes de interação em navegador isolado e captura de prévias.

**Spec:** `docs/superpowers/specs/2026-10-20-portfolio-demos-design.md` — aprovado pelo usuário em 20/10/2026.

## Global Constraints

- “Os nomes e dados dos três modelos são fictícios.” Identificar JRD como projeto publicado e os três modelos como demonstrações autorais.
- “O site externo permanece intacto.” Usar o endereço fornecido `https://www.jrdsolucoesemanutencoes.com.br/` como destino do cartão JRD.
- “As URLs atuais permanecem iguais.” Preservar a geração estática das 26 páginas comerciais.
- “As páginas das demonstrações são geradas estaticamente para `pt-BR` e `en`.” Rotas desconhecidas retornam 404; demos recebem `noindex` e ficam fora do sitemap comercial.
- “As traduções do sistema interativo são enviadas apenas à sua rota”; não ampliar as traduções cliente do site comercial com o conteúdo das demos.
- “O modo standard/premium do site comercial não altera as cores das demonstrações.” Limitar os estilos a cada modelo.
- “Alterações ficam neste navegador e podem ser restauradas por ‘Restaurar demonstração’.” FlowDesk não envia os registros a uma API.
- “Totais são derivados dos itens usando valores monetários em centavos.” Manter conjuntos independentes por idioma, com BRL em português e USD em inglês, sem conversão.
- “A solicitação comercial é uma ação separada que abre o WhatsApp da STARKE LOSUNG e depende de confirmação do visitante.”
- Preservar a exclusão de configurações privadas, caches e dependências instaladas no ZIP reutilizável.

## Review Focus

1. Idioma explícito, links comerciais e documentos HTML continuam corretos depois da mudança de grupos de rotas — teste de navegação da Task 2.
2. Dados já salvos não podem ser sobrescritos pelo estado inicial durante a hidratação; armazenamento bloqueado ou corrompido precisa permitir uso da demo — testes das Tasks 4 e 5.
3. Quantidades inválidas, valores negativos, decimais e totais inseguros não podem gerar orçamentos incorretos — testes da Task 4.
4. Filtros, abas e editores continuam acessíveis por teclado e utilizáveis em 360 px — testes das Tasks 3 e 5.
5. A classificação real/demo e os contatos não podem direcionar o visitante a empresas fictícias ou ao WhatsApp da JRD por engano — testes das Tasks 1 e 6.

## File Structure

| Unidade | Arquivos e responsabilidade |
| --- | --- |
| Catálogo | `lib/portfolio.ts`: classificação, textos localizados, destinos e imagens dos quatro projetos |
| Portfólio | `components/blocks/portfolio-grid.tsx`, página inicial e página de portfólio: cartões compartilhados e links |
| Layouts | `app/[locale]/layout.tsx`, novo `(marketing)/layout.tsx` e `(demos)/demos/[slug]/page.tsx`: documento comum, navegação comercial e seleção de modelo |
| Barra das demos | `components/demos/demo-toolbar.tsx`: voltar, idioma e solicitar projeto semelhante |
| Atlas | `components/demos/atlas-consulting.tsx` e seu CSS module: landing page completa |
| Forma | `components/demos/forma-studio.tsx`, `studio-gallery.tsx` e CSS module: apresentação e galeria interativa |
| FlowDesk domínio | `components/demos/flowdesk/model.ts`, `storage.ts`, `seed.ts`: dados, operações e persistência |
| FlowDesk interface | `flowdesk-demo.tsx`, `clients-panel.tsx`, `quotes-panel.tsx`, `quote-editor.tsx`, CSS module: navegação, tabelas e formulários |
| Conteúdo | `messages/en.json`, `messages/pt-BR.json`, `public/portfolio/`, `public/demos/`: traduções e recursos locais |
| Validação | `tests/portfolio.test.cjs`, `tests/flowdesk.test.cjs`, `e2e/portfolio.spec.ts`, `e2e/flowdesk.spec.ts`, `playwright.config.ts`, `scripts/smoke-test.mjs` |
| Entrega | `scripts/capture-previews.mjs`, `README.md`, `docs/LANCAMENTO.md`, `dist/starke-losung-template.zip` |

### Task 1: Catálogo e portfólio com projeto real e modelos

**Files:** Create `lib/portfolio.ts`, `tests/portfolio.test.cjs`; modify `components/blocks/portfolio-grid.tsx`, `app/[locale]/page.tsx`, `app/[locale]/portfolio/page.tsx`, `messages/en.json`, `messages/pt-BR.json`, `lib/metadata.ts`; create initial local preview assets under `public/portfolio/`.

**Interfaces:** Produce `type PortfolioProjectId = "jrd" | "atlas-consulting" | "forma-studio" | "flowdesk"`; `type PortfolioProject = { id: PortfolioProjectId; kind: "live" | "demo"; title: string; description: string; category: string; href: string; image: string; imageAlt: string; external: boolean }`; `getPortfolioProjects(locale: SupportedLocale): PortfolioProject[]`. `PortfolioGrid` receives `{ title, subtitle?, projects, labels: { live, demo, visit, explore } }` and is consumed by both marketing pages.

- [ ] Write the failing catalog test with independent literal expectations:

```js
const projects = getPortfolioProjects('pt-BR');
assert.equal(projects.length, 4);
assert.equal(projects.find(p => p.id === 'jrd').href, 'https://www.jrdsolucoesemanutencoes.com.br/');
assert.equal(projects.find(p => p.id === 'jrd').kind, 'live');
assert.equal(projects.find(p => p.id === 'flowdesk').href, '/pt-BR/demos/flowdesk');
assert.equal(getPortfolioProjects('en').find(p => p.id === 'atlas-consulting').href, '/en/demos/atlas-consulting');
```

- [ ] Run `node --test tests/portfolio.test.cjs`; verify it fails for the absent catalog.
- [ ] Implement the catalog with JRD first and the three demo destinations from the spec; replace numbered-image cards with the shared component, kind badge, description and real links. Use Next locale-aware links consistently: internal catalog URLs are already locale-prefixed and must not receive another prefix. External links use `noopener noreferrer`.
- [ ] Update heading and subtitle to “Projetos e demonstrações” / “Projects and demos”; remove the blanket statement that every item is fictitious. Derive descriptions from the actual project type without fabricated results.
- [ ] Run `node --test tests/portfolio.test.cjs` and `npm.cmd run check`; expected all tests and checks pass.
- [ ] Commit only this task and the reviewed plan: `feat: add real project and demo portfolio catalog`.

### Task 2: Layouts separados, barra de demonstração e Atlas Consulting

**Files:** Modify `app/[locale]/layout.tsx`; move the nine marketing page directories/files into `app/[locale]/(marketing)/` with unchanged route URLs; create `(marketing)/layout.tsx`, `(demos)/demos/[slug]/page.tsx`, `components/demos/demo-toolbar.tsx`, `components/demos/atlas-consulting.tsx` and `atlas-consulting.module.css`; modify messages and add `playwright.config.ts`, `e2e/portfolio.spec.ts`, `package.json`, lockfile and ignore rules for browser test artifacts.

**Interfaces:** Consume `getPortfolioProjects(locale)` and the existing `RootDocument`, `LocaleSync`, `getWhatsAppUrl`, mode provider and marketing components. Produce `DemoToolbar({locale, slug, projectName}: {locale: SupportedLocale; slug: Exclude<PortfolioProjectId, "jrd">; projectName: string})` and `AtlasConsulting({locale}: {locale: SupportedLocale})`. The server-rendered toolbar uses the explicit slug to build its locale-switch links and needs no browser pathname or global translation provider. Its quote link is a `wa.me` URL for `siteConfig.whatsappNumber`, with localized request text and the project name; it does not send a message automatically.

- [ ] Add and run a failing isolated browser test that opens `/pt-BR/demos/atlas-consulting`, finds the demo identification, opens a FAQ answer and follows the portfolio return link. Include assertions that `/pt-BR/contact` remains Portuguese even with English browser preferences and that the marketing document has one main landmark.
- [ ] Move the existing marketing routes without changing paths or their page exports. Keep locale validation and the HTML document at the locale root; move marketing chrome, mode provider and Organization schema into the marketing group layout.
- [ ] Implement demo dispatch and metadata using the catalog slug, `generateStaticParams` for available demos, and `notFound` for unknown slugs. Set demo metadata to `noindex`; the toolbar must remain available without any duplicated marketing header/footer.
- [ ] Build Atlas as the complete landing page in the spec. Use native `details/summary` for the FAQ, local visuals, scoped CSS and CTAs pointing to the toolbar's real quote destination. Make all section links work.
- [ ] Run `npm.cmd run check`, `npm.cmd run build` and the Atlas/marketing browser checks; expect unchanged marketing URLs, a working PT/EN Atlas route and no duplicated locale prefixes. Run the existing smoke test against the resulting production server.
- [ ] Commit: `feat: add isolated demo layouts and consulting landing page`.

### Task 3: Forma Studio e galeria por categoria

**Files:** Create `components/demos/forma-studio.tsx`, `studio-gallery.tsx`, `forma-studio.module.css`, visual assets in `public/demos/forma/`; modify demo dispatch, message files and `e2e/portfolio.spec.ts`.

**Interfaces:** Consume `DemoToolbar` and localized project information. Produce `FormaStudio({locale}: {locale: SupportedLocale})` and `StudioGallery({projects, labels})`, where projects contain `{id, title, category: "residential" | "commercial", image, imageAlt}` and labels contain `all`, `residential`, `commercial`. All visible projects are identified as conceptual models.

- [ ] Write and run a failing browser test for `/pt-BR/demos/forma-studio`: select “Comerciais”, verify only commercial cards remain, restore “Todos”, and repeat filter navigation with keyboard at a 360 px viewport.
- [ ] Create the complete warm-toned site, local gallery assets, service section, navigation anchors and CTA. The gallery's client component owns only category state; the rest remains server-rendered.
- [ ] Implement filter buttons with clear selected state and accessible names. Preserve the underlying project data when changing filters and show correctly labeled images.
- [ ] Run the Forma browser checks plus `npm.cmd run check`; verify PT/EN titles and that `document.documentElement.scrollWidth` does not exceed the viewport during mobile use.
- [ ] Commit: `feat: add architecture studio website demo`.

### Task 4: Modelo e persistência do FlowDesk

**Files:** Create `components/demos/flowdesk/model.ts`, `seed.ts`, `storage.ts`, `tests/flowdesk.test.cjs`.

**Interfaces:** Produce `DemoClient = {id, name, company, email}`; `QuoteLineItem = {id, description, quantity, unitPriceCents}`; `DemoQuote = {id, clientId, title, items, status: "draft" | "sent" | "approved"}`; `DemoState = {version: 1, clients: DemoClient[], quotes: DemoQuote[]}`. IDs and text fields are strings; quantities and monetary values are numbers. Produce `createSeedState(locale): DemoState`, `calculateQuoteTotal(items: QuoteLineItem[]): number`, `parseMoneyInput(value: string): number | null`, `parseDemoState(raw: string | null, locale): DemoState`, `applyDemoAction(state, action): DemoState`, `getDashboardStats(state): {clientCount, quoteCount, approvedTotalCents}`, `getDemoStorageKey(locale): string`, `saveDemoState(storage, locale, state): boolean`. Actions are `client/upsert`, `quote/upsert` and `quote/status`, with typed payloads. The storage interface uses only `setItem`.

- [ ] Write failing tests asserting the following literal outcomes, and run `node --test tests/flowdesk.test.cjs`:

```js
assert.equal(calculateQuoteTotal([{id:'i1', description:'Service', quantity:3, unitPriceCents:12990}]), 38970);
assert.equal(parseMoneyInput('129,90'), 12990);
assert.equal(parseMoneyInput('129.90'), 12990);
assert.equal(parseMoneyInput('-1.00'), null);
assert.equal(parseMoneyInput('1e4'), null);
assert.throws(() => calculateQuoteTotal([{id:'i1', description:'Service', quantity:0, unitPriceCents:100}]));
```

- [ ] Implement the pure model. Allow integer quantities from 1 to 1000 and nonnegative safe-integer cent amounts; reject nonfinite or unsafe totals. `parseMoneyInput` accepts up to two decimal digits and no thousands separators or exponent notation. Upserts edit existing IDs without duplicates; quotes require an existing client and valid items.
- [ ] Add tests before implementing state parsing and updates: malformed JSON, unknown version/status, invalid item amounts, a quote pointing to a missing client, editing an existing record and an approved quote contributing exactly its total to the dashboard. Invalid stored states fall back to a fresh seed.
- [ ] Implement per-locale seeds and keys `starke.flowdesk.demo.pt-BR.v1` / `starke.flowdesk.demo.en.v1`; save failures return `false` without throwing. Test blocked storage and independent locales. Never use user-entered content as HTML.
- [ ] Run `node --test tests/flowdesk.test.cjs` and `npm.cmd run check`; expected all tests pass.
- [ ] Commit: `feat: add FlowDesk demo data model and local persistence`.

### Task 5: Interface interativa do FlowDesk

**Files:** Create `components/demos/flowdesk/flowdesk-demo.tsx`, `clients-panel.tsx`, `quotes-panel.tsx`, `quote-editor.tsx`, `flowdesk.module.css`, `e2e/flowdesk.spec.ts`; modify demo dispatch and message files.

**Interfaces:** Consume all domain interfaces from Task 4. Produce `FlowDeskDemo({locale}: {locale: SupportedLocale})`. Client and quote panels receive the current typed state and submit typed actions through callbacks. QuoteEditor receives the selected quote, available clients and submit/cancel callbacks. Load only `demos.flowdesk` translations into a nested client provider on this route.

- [ ] Write and run a failing browser workflow: open the demo, create a client, create a two-item quote, verify its displayed total, approve it and verify the panel total, then edit that quote. Assert the new client and quote remain after reload.
- [ ] Implement navigation between dashboard, clients and quotes, search, editors, inline validation, status changes and restore. The seed must render consistently on the server; wait for initial state loading before persisting changes, so a saved state is never overwritten by the seed on mount.
- [ ] Add tests before handling failure cases: initialize the browser with a saved custom client and verify it survives first load; block storage and still create a client during the session; use malformed saved data and verify the page opens with seed data. Test that switching locale opens the independent dataset.
- [ ] Implement these cases and accessible keyboard operation, field labels, focus on editor open/close and clear demo/local-save status. Keep all customer data local and all real quote requests separate from the demo's fictitious records.
- [ ] Run FlowDesk browser tests on desktop and 360 px, `npm.cmd run check` and the full test suite. Expect the complete create/edit/approve/reload/reset workflow to pass without network calls carrying the demo records.
- [ ] Commit: `feat: add interactive FlowDesk client and quote demo`.

### Task 6: Prévias, regressão e template final

**Files:** Create `scripts/capture-previews.mjs`; update `public/portfolio/`, `scripts/smoke-test.mjs`, `e2e/portfolio.spec.ts`, `README.md`, `docs/LANCAMENTO.md`; regenerate the local ZIP using the existing exporter.

**Interfaces:** Consume the three completed demo routes, catalog image paths and existing `npm.cmd run template`. Produce current local preview images, smoke coverage for 32 localized pages and updated delivery documentation. Browser artifacts remain ignored and outside the template allowlist.

- [ ] Add and run failing smoke assertions for all six demo pages, demo `noindex`, unknown demo 404, and their exclusion from the sitemap. Add browser assertions that the two portfolio surfaces show one real-project badge and three demo badges with the correct destinations.
- [ ] Capture actual model previews and a read-only screenshot of JRD in an isolated browser; do not click its contact actions. Use a clearly identified illustrative preview if a capture is unavailable, and record that limitation. Verify every image path in the catalog exists and remove the six obsolete numbered placeholder SVGs once unused.
- [ ] Verify all model contact URLs use `siteConfig.whatsappNumber`, include the model reference and preserve PT/EN wording. Check keyboard operation, desktop and mobile presentation, image loading, return links and absence of unexpected horizontal scrolling.
- [ ] Run `npm.cmd run check`, `npm.cmd run build`, browser tests and the expanded smoke test against production. Expect seven original tests plus new domain/catalog tests, 26 marketing pages and six demo pages, with no type, lint or runtime failures.
- [ ] Update README/checklist to describe real JRD work, available demos and local-only FlowDesk behavior. Run `npm.cmd run template`; inspect ZIP entries and compare the archived lockfile with the current one, ensuring no private configuration or caches are present.
- [ ] Request the final independent code review, fix any important findings, rerun affected checks, and commit the validated work. Push only the current authorized branch with a normal push and report commit, demo links, validation and any remaining limits.

## Execution Handoff

Recomendação: execução **Native**, nesta sessão, seguida de uma revisão independente da alteração completa. Os modelos compartilham o catálogo, os layouts e as traduções; a execução sequencial reduz conflitos nessas interfaces, e os testes de navegador verificam as interações antes da entrega. A alternativa **Subagent-driven** executa cada tarefa com um implementador e um revisor independentes, com maior custo de coordenação.

Implementar somente após a revisão deste plano e a escolha do método pelo usuário.
