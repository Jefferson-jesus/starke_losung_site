import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LocaleSync } from "@/components/locale-sync";
import { getWhatsAppUrl } from "@/lib/locale";
import { siteConfig } from "@/site.config";
import { SiteModeProvider } from "@/components/site-mode-provider";
import { RootDocument, rootMetadata } from "./root-document";

export const metadata = rootMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const typedLocale = locale as "en" | "pt-BR";
  const whatsappUrl = getWhatsAppUrl(typedLocale);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.defaultUrl,
        email: siteConfig.contactEmail,
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: siteConfig.contactEmail,
            availableLanguage: ["English", "Portuguese"]
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: siteConfig.whatsappNumber,
            areaServed: ["BR", "US", "CA", "EU"],
            availableLanguage: ["English", "Portuguese"]
          }
        ]
      }
    ]
  };

  return (
    <RootDocument locale={typedLocale}>
    <NextIntlClientProvider locale={typedLocale} messages={{ common: messages.common, contactForm: messages.contactForm }}>
      <SiteModeProvider initialMode={siteConfig.mode.default}>
        <LocaleSync locale={typedLocale} />
        <div className="min-h-screen bg-[var(--gradient-bg)] transition-colors duration-[var(--motion-slow)] ease-[var(--ease-elegant)]">
          <TopBar />
          <Header showModeToggle={siteConfig.mode.showToggle} />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-graphite-900 focus:p-4">
            {typedLocale === "pt-BR" ? "Ir para o conteúdo" : "Skip to content"}
          </a>
          <main id="main-content">{children}</main>
          <Footer whatsappUrl={whatsappUrl} showModeToggle={siteConfig.mode.showToggle} />
          <WhatsAppFloat href={whatsappUrl} label="WhatsApp" />
        </div>
      </SiteModeProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </NextIntlClientProvider>
    </RootDocument>
  );
}
