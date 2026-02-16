import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug, services } from "@/lib/services";
import { Link } from "@/lib/navigation";

type Props = {
  params: Promise<{ locale: "en" | "pt-BR"; slug: string }>;
};

export function generateStaticParams() {
  return ["en", "pt-BR"].flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = findServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title[locale]} | STARKE LOSUNG`,
    description: service.summary[locale]
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = findServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="section-shell py-20">
      <div className="max-w-3xl space-y-6">
        <Link href="/services" className="text-sm text-silver-300 underline">
          {locale === "pt-BR" ? "Voltar para serviços" : "Back to services"}
        </Link>
        <h1 className="text-4xl font-semibold text-metal">{service.title[locale]}</h1>
        <p className="text-lg text-silver-200">{service.summary[locale]}</p>
        <p className="text-silver-300">{service.content[locale]}</p>
      </div>
    </section>
  );
}
