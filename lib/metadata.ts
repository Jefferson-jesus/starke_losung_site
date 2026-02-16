import type { Metadata } from "next";
import type { SupportedLocale } from "@/site.config";
import { siteConfig } from "@/site.config";

const pageData = {
  home: {
    en: {
      title: "STARKE LOSUNG | Premium Websites & Digital Growth",
      description:
        "Professional website design, SEO and digital promotion for companies that want premium positioning and measurable growth."
    },
    "pt-BR": {
      title: "STARKE LOSUNG | Sites Premium e Divulgação Digital",
      description:
        "Criação profissional de sites, SEO e divulgação digital para empresas que querem posicionamento premium e crescimento real."
    }
  },
  services: {
    en: {
      title: "Services | STARKE LOSUNG",
      description: "Website creation, branding, SEO and paid media strategies."
    },
    "pt-BR": {
      title: "Serviços | STARKE LOSUNG",
      description:
        "Criação de sites, branding, SEO e estratégias de mídia paga."
    }
  },
  portfolio: {
    en: {
      title: "Portfolio | STARKE LOSUNG",
      description: "Selected projects in web design and digital campaigns."
    },
    "pt-BR": {
      title: "Portfólio | STARKE LOSUNG",
      description:
        "Projetos selecionados em design de sites e campanhas digitais."
    }
  },
  pricing: {
    en: {
      title: "Pricing | STARKE LOSUNG",
      description: "Transparent plans for websites, campaigns and support."
    },
    "pt-BR": {
      title: "Preços | STARKE LOSUNG",
      description:
        "Planos transparentes para sites, campanhas e suporte contínuo."
    }
  },
  about: {
    en: {
      title: "About | STARKE LOSUNG",
      description: "Meet our team and methodology."
    },
    "pt-BR": {
      title: "Sobre | STARKE LOSUNG",
      description: "Conheça nosso time e nossa metodologia de entrega."
    }
  },
  contact: {
    en: {
      title: "Contact | STARKE LOSUNG",
      description: "Request a quote and talk to our specialists."
    },
    "pt-BR": {
      title: "Contato | STARKE LOSUNG",
      description: "Solicite um orçamento e fale com nossos especialistas."
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy | STARKE LOSUNG",
      description: "How we process and protect your data."
    },
    "pt-BR": {
      title: "Política de Privacidade | STARKE LOSUNG",
      description: "Como tratamos e protegemos seus dados."
    }
  },
  terms: {
    en: {
      title: "Terms of Service | STARKE LOSUNG",
      description: "Terms that govern the use of our website and services."
    },
    "pt-BR": {
      title: "Termos de Uso | STARKE LOSUNG",
      description: "Termos que regem o uso do nosso site e serviços."
    }
  }
} as const;

export type PageKey = keyof typeof pageData;

export function getPageMetadata(locale: SupportedLocale, page: PageKey): Metadata {
  const data = pageData[page][locale];
  const alternates = {
    canonical: `/${locale === "en" ? "en" : "pt-BR"}${page === "home" ? "" : `/${page}`}`,
    languages: {
      en: `/en${page === "home" ? "" : `/${page}`}`,
      "pt-BR": `/pt-BR${page === "home" ? "" : `/${page}`}`
    }
  };

  return {
    title: data.title,
    description: data.description,
    alternates,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${siteConfig.defaultUrl}/${locale}${page === "home" ? "" : `/${page}`}`,
      siteName: siteConfig.name,
      locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description
    }
  };
}
