import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";
import { Link } from "@/lib/navigation";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

type PricingPlan = {
  key: string;
  value: string;
  popular?: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "pricing");
}

const plans: PricingPlan[] = [
  { key: "Starter", value: "$900+" },
  { key: "Business", value: "$1,900+", popular: true },
  { key: "Premium", value: "$3,400+" }
];

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.pricing" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-6 pb-20 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.key}
            className={`card-premium relative ${plan.popular ? "border-[var(--color-accent)] premium-popular" : ""}`}
          >
            {plan.popular && (
              <span className="mode-premium absolute -top-3 right-5 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-contrast)]">
                {t("mostPopular")}
              </span>
            )}
            <h2 className="text-xl font-semibold text-[var(--color-fg)]">{plan.key}</h2>
            <p className="mt-3 text-3xl font-semibold text-metal">{plan.value}</p>
            <p className="mt-4 text-sm text-[var(--color-muted)]">{t("cardDescription")}</p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full border border-[var(--color-border)] px-5 py-2 text-sm text-[var(--color-fg)]"
            >
              {t("cta")}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}