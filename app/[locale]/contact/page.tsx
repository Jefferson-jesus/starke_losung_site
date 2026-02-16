import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";
import { getWhatsAppUrl } from "@/lib/locale";
import { siteConfig } from "@/site.config";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  const common = await getTranslations({ locale, namespace: "common" });
  const whatsapp = getWhatsAppUrl(locale);

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-8 pb-20 md:grid-cols-[1fr,1.3fr]">
        <div className="space-y-5">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full border border-emerald-300/70 bg-emerald-500 px-6 py-3 text-sm font-semibold text-white"
          >
            {common("ctaWhatsApp")}
          </a>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-block rounded-full border border-silver-300/60 px-6 py-3 text-sm font-semibold text-silver-100"
          >
            {common("ctaEmail")}
          </a>
        </div>
        <ContactForm locale={locale} turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
      </section>
    </>
  );
}
