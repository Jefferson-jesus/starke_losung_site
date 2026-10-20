import type { Metadata } from "next";
import type { SupportedLocale } from "@/site.config";
import { siteConfig } from "@/site.config";

const pageData = {
  home: {
    en: {
      title: "STARKE LOSUNG | Custom software and website development",
      description:
        "Software and website development services for Brazil, the USA and Europe. Custom web applications, business websites and integrations."
    },
    "pt-BR": {
      title: "STARKE LOSUNG | Desenvolvimento de sistemas e sites",
      description:
        "Prestação de serviços de desenvolvimento de sistemas e sites para o Brasil e exterior. Aplicações web, sites empresariais e integrações sob medida."
    }
  },
  services: {
    en: {
      title: "Services | STARKE LOSUNG",
      description: "Custom software, web applications, business websites and SEO/performance services."
    },
    "pt-BR": {
      title: "Servicos | STARKE LOSUNG",
      description: "Sistemas sob medida, aplicações web, sites empresariais e serviços de SEO e performance."
    }
  },
  portfolio: {
    en: {
      title: "Portfolio | STARKE LOSUNG",
      description: "Selected projects in web design and digital campaigns."
    },
    "pt-BR": {
      title: "Portfolio | STARKE LOSUNG",
      description: "Projetos selecionados em design de sites e campanhas digitais."
    }
  },
  pricing: {
    en: {
      title: "Pricing | STARKE LOSUNG",
      description: "Simple packages tailored to your business stage."
    },
    "pt-BR": {
      title: "Precos | STARKE LOSUNG",
      description: "Pacotes simples com customizacao por escopo e objetivos."
    }
  },
  about: {
    en: {
      title: "About | STARKE LOSUNG",
      description: "International-level websites focused on performance and outcomes."
    },
    "pt-BR": {
      title: "Sobre | STARKE LOSUNG",
      description: "Sites em nivel internacional com foco em performance e resultado."
    }
  },
  contact: {
    en: {
      title: "Contact | STARKE LOSUNG",
      description: "Request a quote and get a clear delivery plan."
    },
    "pt-BR": {
      title: "Contato | STARKE LOSUNG",
      description: "Solicite um orcamento e receba um plano claro de entrega."
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy | STARKE LOSUNG",
      description: "How we process and protect your data."
    },
    "pt-BR": {
      title: "Politica de Privacidade | STARKE LOSUNG",
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
      description: "Termos que regem o uso do nosso site e servicos."
    }
  }
} as const;

export type PageKey = keyof typeof pageData;

export function getPageMetadata(locale: SupportedLocale, page: PageKey): Metadata {
  const data = pageData[page][locale];
  const suffix = page === "home" ? "" : `/${page}`;
  const canonicalPath = `/${locale}${suffix}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en${suffix}`,
        "pt-BR": `/pt-BR${suffix}`,
        "x-default": `/en${suffix}`
      }
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${siteConfig.defaultUrl}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt-BR" ? ["en_US"] : ["pt_BR"],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description
    }
  };
}
