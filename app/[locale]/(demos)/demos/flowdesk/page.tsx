import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPortfolioProjects } from "@/lib/portfolio";
import { DemoToolbar } from "@/components/demos/demo-toolbar";
import { FlowDeskDemo } from "@/components/demos/flowdesk/flowdesk-demo";

type Props = { params: Promise<{ locale: string }> };

function getDemo(locale: string) {
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = getPortfolioProjects(locale).find((item) => item.id === "flowdesk" && item.kind === "demo");
  if (!project) notFound();
  return { project, locale };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, locale } = getDemo((await params).locale);
  return {
    title: `${project.title} — ${locale === "pt-BR" ? "Demonstração autoral" : "Original demo"}`,
    description: project.description,
    robots: { index: false, follow: false },
    openGraph: { title: project.title, description: project.description },
    twitter: { title: project.title, description: project.description }
  };
}

// A separate route entry keeps FlowDesk's client code out of Forma's bundle.
// Locale params come from the parent layout; the slug dispatcher omits FlowDesk.
export default async function FlowDeskPage({ params }: Props) {
  const { project, locale } = getDemo((await params).locale);
  setRequestLocale(locale);
  const flowdeskMessages = (await getMessages()).demos as { flowdesk: Record<string, string> };
  return (
    <>
      <DemoToolbar locale={locale} slug="flowdesk" projectName={project.title} />
      <NextIntlClientProvider locale={locale} messages={{ demos: { flowdesk: flowdeskMessages.flowdesk } }}>
        <FlowDeskDemo key={locale} locale={locale} />
      </NextIntlClientProvider>
    </>
  );
}
