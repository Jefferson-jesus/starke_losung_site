import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "terms");
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell pb-20">
        <article className="card-premium max-w-4xl space-y-4 text-sm text-silver-200">
          <p>
            {locale === "pt-BR"
              ? "Os serviços são executados conforme proposta aprovada, com prazos e entregas acordados entre as partes."
              : "Services are executed according to the approved proposal, with timelines and deliverables agreed by both parties."}
          </p>
          <p>
            {locale === "pt-BR"
              ? "O uso deste site implica concordância com estas condições e com nossa política de privacidade."
              : "Using this website implies agreement with these terms and our privacy policy."}
          </p>
        </article>
      </section>
    </>
  );
}
