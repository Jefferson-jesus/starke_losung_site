import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.about" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-8 pb-20 md:grid-cols-2">
        <article className="card-premium">
          <h2 className="text-xl font-semibold text-silver-100">{t("visionTitle")}</h2>
          <p className="mt-3 text-silver-300">{t("visionBody")}</p>
        </article>
        <article className="card-premium">
          <h2 className="text-xl font-semibold text-silver-100">{t("methodTitle")}</h2>
          <p className="mt-3 text-silver-300">{t("methodBody")}</p>
        </article>
      </section>
    </>
  );
}