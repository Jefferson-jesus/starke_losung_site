import type { SupportedLocale } from "@/site.config";

export type PortfolioProjectId = "jrd" | "atlas-consulting" | "forma-studio" | "flowdesk";

export type PortfolioProject = {
  id: PortfolioProjectId;
  kind: "live" | "demo";
  title: string;
  description: string;
  category: string;
  href: string;
  image: string;
  imageAlt: string;
  external: boolean;
};

const copy = {
  "pt-BR": {
    jrd: {
      description: "Site publicado da JRD Soluções e Manutenções, com apresentação de serviços e contato por WhatsApp.",
      category: "Site de serviços",
      imageAlt: "Captura do site publicado da JRD Soluções e Manutenções."
    },
    "atlas-consulting": {
      description: "Demonstração autoral de uma landing page B2B, com serviços, processo e perguntas frequentes para uma consultoria fictícia.",
      category: "Landing page B2B",
      imageAlt: "Captura da demonstração Atlas Consulting, com fundo claro e destaques em azul profundo."
    },
    "forma-studio": {
      description: "Demonstração autoral de um site de arquitetura e interiores, com serviços e galeria por categoria de um estúdio fictício.",
      category: "Arquitetura e interiores",
      imageAlt: "Captura da demonstração Forma Studio, com tons quentes e galeria de arquitetura."
    },
    flowdesk: {
      description: "Sistema demonstrativo com clientes, orçamentos e indicadores baseados em dados fictícios, para experimentar no navegador.",
      category: "Sistema de gestão",
      imageAlt: "Captura da demonstração FlowDesk, com painel de indicadores e lista de orçamentos."
    }
  },
  en: {
    jrd: {
      description: "Published website for JRD Soluções e Manutenções, presenting its services and WhatsApp contact.",
      category: "Service business website",
      imageAlt: "Screenshot of the published JRD Soluções e Manutenções service website."
    },
    "atlas-consulting": {
      description: "An original B2B landing page demo with services, a process overview and frequently asked questions for a fictional consultancy.",
      category: "B2B landing page",
      imageAlt: "Screenshot of the Atlas Consulting demo, with a light background and deep blue accents."
    },
    "forma-studio": {
      description: "An original architecture and interiors website demo, with services and a gallery by category for a fictional studio.",
      category: "Architecture and interiors",
      imageAlt: "Screenshot of the Forma Studio demo, with warm tones and an architecture gallery."
    },
    flowdesk: {
      description: "A demo system with customers, quotes and indicators based on fictional data, ready to try in your browser.",
      category: "Business management system",
      imageAlt: "Screenshot of the FlowDesk demo, with dashboard indicators and a list of quotes."
    }
  }
} satisfies Record<SupportedLocale, Record<PortfolioProjectId, Pick<PortfolioProject, "description" | "category" | "imageAlt">>>;

export function getPortfolioProjects(locale: SupportedLocale): PortfolioProject[] {
  return [
    {
      id: "jrd",
      kind: "live",
      title: "JRD Soluções e Manutenções",
      ...copy[locale].jrd,
      href: "https://www.jrdsolucoesemanutencoes.com.br/",
      image: "/portfolio/jrd.png",
      external: true
    },
    {
      id: "atlas-consulting",
      kind: "demo",
      title: "Atlas Consulting",
      ...copy[locale]["atlas-consulting"],
      href: `/${locale}/demos/atlas-consulting`,
      image: "/portfolio/atlas-consulting.png",
      external: false
    },
    {
      id: "forma-studio",
      kind: "demo",
      title: "Forma Studio",
      ...copy[locale]["forma-studio"],
      href: `/${locale}/demos/forma-studio`,
      image: "/portfolio/forma-studio.png",
      external: false
    },
    {
      id: "flowdesk",
      kind: "demo",
      title: "FlowDesk",
      ...copy[locale].flowdesk,
      href: `/${locale}/demos/flowdesk`,
      image: "/portfolio/flowdesk.png",
      external: false
    }
  ];
}
