const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const load = require("./load-typescript.cjs");

test("the portfolio lists JRD first as a published external project", () => {
  const { getPortfolioProjects } = load("lib/portfolio.ts");
  const projects = getPortfolioProjects("pt-BR");

  assert.equal(projects.length, 4);
  assert.deepEqual(projects.map((project) => project.id), ["jrd", "atlas-consulting", "forma-studio", "flowdesk"]);
  const jrd = projects.find((project) => project.id === "jrd");
  assert.equal(jrd.href, "https://www.jrdsolucoesemanutencoes.com.br/");
  assert.equal(jrd.kind, "live");
  assert.equal(jrd.external, true);
});

test("demo destinations include exactly one prefix for the requested language", () => {
  const { getPortfolioProjects } = load("lib/portfolio.ts");

  for (const [locale, expected] of [
    ["pt-BR", ["/pt-BR/demos/atlas-consulting", "/pt-BR/demos/forma-studio", "/pt-BR/demos/flowdesk"]],
    ["en", ["/en/demos/atlas-consulting", "/en/demos/forma-studio", "/en/demos/flowdesk"]]
  ]) {
    const demos = getPortfolioProjects(locale).filter((project) => project.kind === "demo");
    assert.deepEqual(demos.map((project) => project.href), expected);
    assert.ok(demos.every((project) => project.external === false));
  }
});

test("each language provides descriptions and accessible local previews", () => {
  const { getPortfolioProjects } = load("lib/portfolio.ts");

  for (const locale of ["pt-BR", "en"]) {
    for (const project of getPortfolioProjects(locale)) {
      for (const field of ["title", "description", "category", "imageAlt"]) {
        assert.ok(project[field].trim().length > 0, `${locale}/${project.id}: missing ${field}`);
      }
      assert.ok(project.image.startsWith("/portfolio/"));
      assert.ok(fs.existsSync(path.join(__dirname, "../public", project.image)), project.image);
    }
  }

  assert.notEqual(getPortfolioProjects("en")[0].description, getPortfolioProjects("pt-BR")[0].description);
});
