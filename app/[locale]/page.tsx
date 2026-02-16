import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/site.config";
import { Link } from "@/lib/navigation";
import { getPageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/contact-form";
import { getWhatsAppUrl } from "@/lib/locale";

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
      {siteConfig.campaignBanner.enabled && (
        <section className="border-b border-white/10 bg-black/20">
          <div className="section-shell flex flex-wrap items-center justify-between gap-4 py-3 text-sm">
            <p className="text-silver-200">
              <span className="mr-2 rounded-full border border-silver-300/30 px-2 py-0.5 text-xs uppercase">
                {t("campaignPrefix")}
              </span>
              {campaignText}
            </p>
            <Link href={siteConfig.campaignBanner.link} className="text-silver-100 underline underline-offset-4">
              {common("learnMore")}
            </Link>
          </div>
        </section>
      )}

      <section className="section-shell grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-silver-300">{t("hero.kicker")}</p>
          <h1 className="text-4xl font-semibold leading-tight text-metal sm:text-5xl">{t("hero.title")}</h1>
          <p className="max-w-xl text-base text-silver-200 sm:text-lg">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full border border-silver-200 bg-silver-200 px-6 py-3 text-sm font-semibold text-graphite-900 transition hover:-translate-y-0.5 hover:bg-white"
            >
              {t("hero.primaryCta")}
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-silver-300/50 px-6 py-3 text-sm font-semibold text-silver-100 transition hover:border-silver-200"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
          <p className="text-sm text-silver-300">{t("hero.socialProof")}</p>
        </div>

        <div className="card-premium">
          <div className="space-y-5">
            <Image src="/logo-mark.svg" alt="STARKE LOSUNG mark" width={72} height={72} className="mx-auto" />
            <h2 className="text-center text-xl font-semibold text-silver-100">{t("hero.rightCardTitle")}</h2>
            <p className="text-center text-sm text-silver-300">{t("hero.rightCardSubtitle")}</p>
            <ul className="space-y-2 text-sm text-silver-200">
              {heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-silver-300" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20">
        <div className="section-shell py-8">
          <div className="grid gap-4 md:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-silver-100">
                  {item.icon}
                </p>
                <h2 className="mt-3 text-sm font-semibold text-silver-100">{item.title}</h2>
                <p className="mt-1 text-xs text-silver-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <h2 className="text-3xl font-semibold text-metal">{t("services.title")}</h2>
        <p className="mt-3 max-w-3xl text-silver-200">{t("services.subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {serviceCards.map((item) => (
            <article key={item.slug} className="card-premium animate-fade-up">
              <h3 className="text-xl font-semibold text-silver-100">{item.title}</h3>
              <p className="mt-3 text-sm text-silver-300">{item.description}</p>
              <Link href={`/services/${item.slug}`} className="mt-4 inline-block text-sm text-silver-200 underline">
                {common("learnMore")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {siteConfig.midCta.enabled && (
        <section className="section-shell pb-10">
          <div className="rounded-2xl border border-silver-300/30 bg-silver-300/10 p-8 text-center">
            <p className="mx-auto max-w-3xl text-lg text-silver-100">{midCtaText}</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border border-silver-200 bg-silver-200 px-6 py-3 text-sm font-semibold text-graphite-900"
            >
              {t("midCtaButton")}
            </Link>
          </div>
        </section>
      )}

      <section className="section-shell py-10">
        <h2 className="text-3xl font-semibold text-metal">{t("whyUs.title")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsBlocks.map((block) => (
            <article key={block.title} className="card-premium">
              <h3 className="text-lg font-semibold text-silver-100">{block.title}</h3>
              <p className="mt-3 text-sm text-silver-300">{block.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <h2 className="text-3xl font-semibold text-metal">{t("process.title")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={step.title} className="card-premium">
              <p className="text-xs uppercase tracking-[0.18em] text-silver-400">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-silver-100">{step.title}</h3>
              <p className="mt-2 text-sm text-silver-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <h2 className="text-3xl font-semibold text-metal">{t("portfolio.title")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioCards.map((item, index) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <Image
                src={`/portfolio-${index + 1}.svg`}
                alt={item.title}
                width={1200}
                height={800}
                className="aspect-[4/3] h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-silver-100">{item.title}</h3>
                <p className="mt-1 text-sm text-silver-300">{item.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <h2 className="text-3xl font-semibold text-metal">{t("testimonials.title")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={`${item.name}-${item.role}`} className="card-premium">
              <p className="text-sm text-silver-200">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-5 text-sm font-semibold text-silver-100">{item.name}</p>
              <p className="text-xs text-silver-400">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <h2 className="text-3xl font-semibold text-metal">{t("faq.title")}</h2>
        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="card-premium group">
              <summary className="cursor-pointer list-none text-base font-semibold text-silver-100">{item.question}</summary>
              <p className="mt-3 text-sm text-silver-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {siteConfig.finalCta.enabled && (
        <section className="section-shell pb-20">
          <div className="rounded-3xl border border-silver-200/40 bg-silver-200/10 px-6 py-12 text-center">
            <p className="mx-auto max-w-3xl text-2xl font-semibold text-silver-100">{finalCtaText}</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border border-silver-200 bg-silver-200 px-6 py-3 text-sm font-semibold text-graphite-900"
            >
              {t("finalCtaButton")}
            </Link>
          </div>
        </section>
      )}

      <section id="contact" className="section-shell grid gap-8 pb-24 md:grid-cols-[1fr,1.2fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-metal">{t("contactTitle")}</h2>
          <p className="text-silver-200">{t("contactSubtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-emerald-300/70 bg-emerald-500 px-6 py-3 text-sm font-semibold text-white"
            >
              {common("ctaWhatsApp")}
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="rounded-full border border-silver-300/50 px-6 py-3 text-sm font-semibold text-silver-100"
            >
              {common("ctaEmail")}
            </a>
          </div>
        </div>
        <ContactForm locale={locale} compact turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
      </section>
    </>
  );
}