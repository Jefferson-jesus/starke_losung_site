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
import { SITE_MODE_COOKIE, resolveSiteMode } from "@/lib/site-mode";
import { cookies } from "next/headers";
import { SiteModeProvider } from "@/components/site-mode-provider";

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
  const cookieStore = await cookies();
  const initialMode = resolveSiteMode(cookieStore.get(SITE_MODE_COOKIE)?.value) || siteConfig.mode.default;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.defaultUrl,
        email: siteConfig.contactEmail,
        sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook],
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
      },
      {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.defaultUrl,
        email: siteConfig.contactEmail,
        telephone: siteConfig.whatsappNumber,
        description:
          typedLocale === "pt-BR"
            ? "Agencia de criacao de sites e divulgacao digital."
            : "Website creation and digital growth agency."
      }
    ]
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteModeProvider initialMode={initialMode}>
        <LocaleSync locale={typedLocale} />
        <div className="min-h-screen bg-[var(--gradient-bg)] transition-colors duration-[var(--motion-slow)] ease-[var(--ease-elegant)]">
          <TopBar />
          <Header showModeToggle={siteConfig.mode.showToggle} />
          <main>{children}</main>
          <Footer whatsappUrl={whatsappUrl} showModeToggle={siteConfig.mode.showToggle} />
          <WhatsAppFloat href={whatsappUrl} label="WhatsApp" />
        </div>
      </SiteModeProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </NextIntlClientProvider>
  );
}