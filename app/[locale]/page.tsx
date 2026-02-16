import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/site.config";
import { getPageMetadata } from "@/lib/metadata";
import { getWhatsAppUrl } from "@/lib/locale";
import { CampaignBanner } from "@/components/blocks/campaign-banner";
import { HeroBlock } from "@/components/blocks/hero-block";
import { TrustStrip } from "@/components/blocks/trust-strip";
import { ServicesGrid } from "@/components/blocks/services-grid";
import { WhyUsBlock } from "@/components/blocks/why-us-block";
import { ProcessTimeline } from "@/components/blocks/process-timeline";
import { PortfolioGrid } from "@/components/blocks/portfolio-grid";
import { CaseStudyHighlight } from "@/components/blocks/case-study-highlight";
import { TestimonialsBlock } from "@/components/blocks/testimonials-block";
import { FaqBlock } from "@/components/blocks/faq-block";
import { MidCtaBlock } from "@/components/blocks/mid-cta-block";
import { FinalCtaBlock } from "@/components/blocks/final-cta-block";
import { ContactBlock } from "@/components/blocks/contact-block";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

type ServiceCard = { slug: string; title: string; description: string };
type WhyBlock = { title: string; description: string };
type ProcessStep = { title: string; description: string };
type PortfolioCard = { title: string; category: string };
type Testimonial = { name: string; role: string; quote: string };
type FaqItem = { question: string; answer: string };
type TrustItem = { icon: string; title: string; description: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });
  const whatsappUrl = getWhatsAppUrl(locale);

  const serviceCards = t.raw("services.cards") as ServiceCard[];
  const whyUsBlocks = t.raw("whyUs.blocks") as WhyBlock[];
  const processSteps = t.raw("process.steps") as ProcessStep[];
  const portfolioCards = t.raw("portfolio.cards") as PortfolioCard[];
  const testimonials = t.raw("testimonials.items") as Testimonial[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const trustItems = t.raw("trust.items") as TrustItem[];
  const heroBullets = t.raw("hero.rightCardBullets") as string[];

  const campaignText = locale === "pt-BR" ? siteConfig.campaignBanner.text_pt : siteConfig.campaignBanner.text_en;
  const midCtaText = locale === "pt-BR" ? siteConfig.midCta.text_pt : siteConfig.midCta.text_en;
  const finalCtaText = locale === "pt-BR" ? siteConfig.finalCta.text_pt : siteConfig.finalCta.text_en;

  return (
    <>
      <CampaignBanner
        enabled={siteConfig.campaignBanner.enabled}
        label={t("campaignPrefix")}
        text={campaignText}
        link={siteConfig.campaignBanner.link}
        linkLabel={common("learnMore")}
      />

      <HeroBlock
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={t("hero.primaryCta")}
        secondaryCta={t("hero.secondaryCta")}
        socialProof={t("hero.socialProof")}
        rightCardTitle={t("hero.rightCardTitle")}
        rightCardSubtitle={t("hero.rightCardSubtitle")}
        bullets={heroBullets}
      />

      <TrustStrip items={trustItems} />

      <ServicesGrid
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        cards={serviceCards}
        ctaLabel={common("learnMore")}
      />

      <MidCtaBlock enabled={siteConfig.midCta.enabled} text={midCtaText} buttonLabel={t("midCtaButton")} />

      <WhyUsBlock title={t("whyUs.title")} items={whyUsBlocks} />

      <ProcessTimeline
        title={t("process.title")}
        steps={processSteps}
        showInStandard={siteConfig.mode.showProcessInStandard}
      />

      <PortfolioGrid title={t("portfolio.title")} cards={portfolioCards} />

      <CaseStudyHighlight
        label={t("caseStudy.label")}
        title={t("caseStudy.title")}
        description={t("caseStudy.description")}
        cta={common("viewMore")}
      />

      <TestimonialsBlock title={t("testimonials.title")} items={testimonials} />

      <FaqBlock title={t("faq.title")} items={faqItems} />

      <FinalCtaBlock enabled={siteConfig.finalCta.enabled} text={finalCtaText} buttonLabel={t("finalCtaButton")} />

      <ContactBlock
        title={t("contactTitle")}
        subtitle={t("contactSubtitle")}
        whatsappUrl={whatsappUrl}
        whatsappLabel={common("ctaWhatsApp")}
        emailLabel={common("ctaEmail")}
        email={siteConfig.contactEmail}
        locale={locale}
        turnstileSiteKey={process.env.TURNSTILE_SITE_KEY}
      />
    </>
  );
}