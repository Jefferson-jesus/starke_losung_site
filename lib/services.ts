export type ServiceItem = {
  slug: string;
  title: { en: string; "pt-BR": string };
  summary: { en: string; "pt-BR": string };
  content: { en: string; "pt-BR": string };
};

export const services: ServiceItem[] = [
  {
    slug: "website-design-development",
    title: {
      en: "Website Design & Development",
      "pt-BR": "Criação de Sites e Desenvolvimento"
    },
    summary: {
      en: "Premium institutional websites and conversion-focused landing pages.",
      "pt-BR": "Sites institucionais premium e landing pages focadas em conversão."
    },
    content: {
      en: "We design and develop high-performance websites using modern technologies, SEO-first architecture and clear conversion flows.",
      "pt-BR":
        "Criamos sites de alta performance com tecnologias modernas, arquitetura SEO-first e fluxos de conversão claros."
    }
  },
  {
    slug: "seo-content-strategy",
    title: {
      en: "SEO & Content Strategy",
      "pt-BR": "SEO e Estratégia de Conteúdo"
    },
    summary: {
      en: "Technical SEO and structured content plans for growth.",
      "pt-BR": "SEO técnico e planejamento de conteúdo estruturado para crescimento."
    },
    content: {
      en: "From keyword mapping to technical optimization, we structure your site to compete for relevant organic traffic.",
      "pt-BR":
        "Do mapeamento de palavras-chave à otimização técnica, estruturamos seu site para disputar tráfego orgânico qualificado."
    }
  },
  {
    slug: "paid-media-growth",
    title: {
      en: "Paid Media & Growth",
      "pt-BR": "Mídia Paga e Growth"
    },
    summary: {
      en: "Campaigns with measurable ROI on Google and Meta.",
      "pt-BR": "Campanhas com ROI mensurável no Google e Meta."
    },
    content: {
      en: "We build and optimize ad campaigns focused on qualified leads, CAC control and scalable growth.",
      "pt-BR":
        "Montamos e otimizamos campanhas focadas em leads qualificados, controle de CAC e escala sustentável."
    }
  },
  {
    slug: "branding-conversion-ux",
    title: {
      en: "Branding & Conversion UX",
      "pt-BR": "Branding e UX de Conversão"
    },
    summary: {
      en: "Visual systems and UX patterns that build trust.",
      "pt-BR": "Sistema visual e UX orientados para gerar confiança."
    },
    content: {
      en: "We refine your brand identity and digital interface to communicate authority and reduce friction in the customer journey.",
      "pt-BR":
        "Refinamos sua identidade e interface digital para comunicar autoridade e reduzir fricção na jornada do cliente."
    }
  },
  {
    slug: "criacao-sites-desenvolvimento",
    title: {
      en: "Website Design & Development",
      "pt-BR": "Criação de Sites e Desenvolvimento"
    },
    summary: {
      en: "Premium institutional websites and conversion-focused landing pages.",
      "pt-BR": "Sites institucionais premium e landing pages focadas em conversão."
    },
    content: {
      en: "We design and develop high-performance websites using modern technologies, SEO-first architecture and clear conversion flows.",
      "pt-BR":
        "Criamos sites de alta performance com tecnologias modernas, arquitetura SEO-first e fluxos de conversão claros."
    }
  },
  {
    slug: "seo-estrategia-conteudo",
    title: {
      en: "SEO & Content Strategy",
      "pt-BR": "SEO e Estratégia de Conteúdo"
    },
    summary: {
      en: "Technical SEO and structured content plans for growth.",
      "pt-BR": "SEO técnico e planejamento de conteúdo estruturado para crescimento."
    },
    content: {
      en: "From keyword mapping to technical optimization, we structure your site to compete for relevant organic traffic.",
      "pt-BR":
        "Do mapeamento de palavras-chave à otimização técnica, estruturamos seu site para disputar tráfego orgânico qualificado."
    }
  },
  {
    slug: "midia-paga-growth",
    title: {
      en: "Paid Media & Growth",
      "pt-BR": "Mídia Paga e Growth"
    },
    summary: {
      en: "Campaigns with measurable ROI on Google and Meta.",
      "pt-BR": "Campanhas com ROI mensurável no Google e Meta."
    },
    content: {
      en: "We build and optimize ad campaigns focused on qualified leads, CAC control and scalable growth.",
      "pt-BR":
        "Montamos e otimizamos campanhas focadas em leads qualificados, controle de CAC e escala sustentável."
    }
  },
  {
    slug: "branding-ux-conversao",
    title: {
      en: "Branding & Conversion UX",
      "pt-BR": "Branding e UX de Conversão"
    },
    summary: {
      en: "Visual systems and UX patterns that build trust.",
      "pt-BR": "Sistema visual e UX orientados para gerar confiança."
    },
    content: {
      en: "We refine your brand identity and digital interface to communicate authority and reduce friction in the customer journey.",
      "pt-BR":
        "Refinamos sua identidade e interface digital para comunicar autoridade e reduzir fricção na jornada do cliente."
    }
  }
];

export function findServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
