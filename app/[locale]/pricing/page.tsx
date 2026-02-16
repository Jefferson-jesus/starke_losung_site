import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";
import { Link } from "@/lib/navigation";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "pricing");
}

const plans = [
  { key: "Starter", value: "$900+" },
  { key: "Growth", value: "$1,900+" },
  { key: "Performance", value: "$3,400+" }
];

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-6 pb-20 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.key} className="card-premium">
            <h2 className="text-xl font-semibold text-silver-100">{plan.key}</h2>
            <p className="mt-3 text-3xl font-semibold text-metal">{plan.value}</p>
            <p className="mt-4 text-sm text-silver-300">
              {locale === "pt-BR"
                ? "Escopo ajustado ao seu objetivo com cronograma e entregas definidas."
                : "Scope tailored to your goals with a clear roadmap and deliverables."}
            </p>
            <Link href="/contact" className="mt-5 inline-block rounded-full border border-silver-300/50 px-5 py-2 text-sm">
              {locale === "pt-BR" ? "Solicitar proposta" : "Request proposal"}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
