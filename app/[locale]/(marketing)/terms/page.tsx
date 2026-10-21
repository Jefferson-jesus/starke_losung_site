import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.terms" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell pb-20">
        <article className="card-premium max-w-4xl space-y-4 text-sm text-silver-200">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </article>
      </section>
    </>
  );
}