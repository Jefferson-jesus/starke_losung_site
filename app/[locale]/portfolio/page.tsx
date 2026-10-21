import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { PortfolioGrid } from "@/components/blocks/portfolio-grid";
import { getPageMetadata } from "@/lib/metadata";
import { getPortfolioProjects } from "@/lib/portfolio";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "portfolio");
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.portfolio" });
  const home = await getTranslations({ locale, namespace: "home" });
  const projects = getPortfolioProjects(locale);

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <PortfolioGrid
        title={t("gridTitle")}
        projects={projects}
        labels={{
          live: home("portfolio.labels.live"),
          demo: home("portfolio.labels.demo"),
          visit: home("portfolio.labels.visit"),
          explore: home("portfolio.labels.explore")
        }}
      />
    </>
  );
}
