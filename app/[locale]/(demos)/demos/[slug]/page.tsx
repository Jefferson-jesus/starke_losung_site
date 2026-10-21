import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPortfolioProjects } from "@/lib/portfolio";
import { DemoToolbar } from "@/components/demos/demo-toolbar";
import { AtlasConsulting } from "@/components/demos/atlas-consulting";
import { FormaStudio } from "@/components/demos/forma-studio";
import { FlowDeskDemo } from "@/components/demos/flowdesk/flowdesk-demo";

type Props = { params: Promise<{ locale: string; slug: string }> };
const availableDemos = ["atlas-consulting", "forma-studio", "flowdesk"] as const;

export function generateStaticParams() {
  return availableDemos.map((slug) => ({ slug }));
}

function getDemo(locale: string, slug: string) {
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = getPortfolioProjects(locale).find((item) => item.id === slug && item.kind === "demo");
  if (!project || project.id === "jrd" || !availableDemos.some((id) => id === project.id)) notFound();
  return { project, locale, slug: project.id };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const { project } = getDemo(locale, slug);
  return {
    title: `${project.title} — ${locale === "pt-BR" ? "Demonstração autoral" : "Original demo"}`,
    description: project.description,
    robots: { index: false, follow: false },
    openGraph: { title: project.title, description: project.description },
    twitter: { title: project.title, description: project.description }
  };
}

export default async function DemoPage({ params }: Props) {
  const values = await params;
  const { project, locale, slug } = getDemo(values.locale, values.slug);
  setRequestLocale(locale);
  const flowdeskMessages = slug === "flowdesk" ? (await getMessages()).demos : undefined;
  return (
    <>
      <DemoToolbar locale={locale} slug={slug} projectName={project.title} />
      {slug === "flowdesk" ? <NextIntlClientProvider locale={locale} messages={{ demos: { flowdesk: (flowdeskMessages as { flowdesk: Record<string, string> }).flowdesk } }}><FlowDeskDemo key={locale} locale={locale} /></NextIntlClientProvider> : slug === "forma-studio" ? <FormaStudio locale={locale} /> : <AtlasConsulting locale={locale} />}
    </>
  );
}
