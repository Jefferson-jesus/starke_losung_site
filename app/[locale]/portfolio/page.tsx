import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "portfolio");
}

type PortfolioCard = { title: string; category: string };

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });
  const home = await getTranslations({ locale, namespace: "home" });
  const cards = home.raw("portfolio.cards") as PortfolioCard[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((item, index) => (
          <article key={item.title} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Image
              src={`/portfolio-${index + 1}.svg`}
              alt={item.title}
              width={1200}
              height={800}
              className="aspect-[4/3] h-auto w-full object-cover transition duration-500 hover:scale-105"
            />
            <div className="p-5">
              <h2 className="text-base font-semibold text-silver-100">{item.title}</h2>
              <p className="mt-1 text-sm text-silver-300">{item.category}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
