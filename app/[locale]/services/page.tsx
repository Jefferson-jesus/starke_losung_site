import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { getPageMetadata } from "@/lib/metadata";
import { Link } from "@/lib/navigation";
import { services } from "@/lib/services";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const uniqueServices = services.filter((item, index, all) => all.findIndex((value) => value.title[locale] === item.title[locale]) === index);

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <section className="section-shell grid gap-6 pb-20 md:grid-cols-2">
        {uniqueServices.map((service) => (
          <article key={service.slug} className="card-premium">
            <h2 className="text-xl font-semibold text-silver-100">{service.title[locale]}</h2>
            <p className="mt-3 text-sm text-silver-300">{service.summary[locale]}</p>
            <Link href={`/services/${service.slug}`} className="mt-4 inline-block text-sm text-silver-200 underline">
              Details
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
