import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell pb-20">
        <article className="card-premium max-w-4xl space-y-4 text-sm text-silver-200">
          <p>
            {locale === "pt-BR"
              ? "Utilizamos os dados enviados via formulário apenas para responder solicitações comerciais e técnicas."
              : "We use data submitted through forms only to respond to commercial and technical requests."}
          </p>
          <p>
            {locale === "pt-BR"
              ? "Você pode solicitar alteração ou remoção dos dados a qualquer momento através do nosso e-mail de contato."
              : "You can request data updates or deletion at any time through our contact email."}
          </p>
        </article>
      </section>
    </>
  );
}
