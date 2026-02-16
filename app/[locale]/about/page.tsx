import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-8 pb-20 md:grid-cols-2">
        <article className="card-premium">
          <h2 className="text-xl font-semibold text-silver-100">{locale === "pt-BR" ? "Nossa visão" : "Our vision"}</h2>
          <p className="mt-3 text-silver-300">
            {locale === "pt-BR"
              ? "Combinar estética premium e engenharia digital para construir marcas fortes no ambiente online."
              : "Combine premium aesthetics and digital engineering to build strong online brands."}
          </p>
        </article>
        <article className="card-premium">
          <h2 className="text-xl font-semibold text-silver-100">{locale === "pt-BR" ? "Nosso método" : "Our method"}</h2>
          <p className="mt-3 text-silver-300">
            {locale === "pt-BR"
              ? "Diagnóstico, planejamento, execução e melhoria contínua com métricas transparentes."
              : "Discovery, planning, execution and continuous optimization with transparent metrics."}
          </p>
        </article>
      </section>
    </>
  );
}
