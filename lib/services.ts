export type ServiceItem = {
  slug: string;
  title: { en: string; "pt-BR": string };
  summary: { en: string; "pt-BR": string };
  content: { en: string; "pt-BR": string };
};

export const services: ServiceItem[] = [
  {
    slug: "landing-pages",
    title: {
      en: "Landing Pages",
      "pt-BR": "Landing Pages"
    },
    summary: {
      en: "Ad-focused pages with strong CTAs, speed and conversion.",
      "pt-BR": "Paginas para anuncios com CTA forte, velocidade e conversao."
    },
    content: {
      en: "Built for paid traffic with clear messaging hierarchy, one-click contact and technical SEO setup.",
      "pt-BR": "Criadas para trafego pago com hierarquia de mensagem clara, contato em um clique e SEO tecnico aplicado."
    }
  },
  {
    slug: "business-websites",
    title: {
      en: "Business Websites",
      "pt-BR": "Sites Empresariais"
    },
    summary: {
      en: "Professional digital presence for companies in Brazil and abroad.",
      "pt-BR": "Presenca digital profissional para empresas no Brasil e exterior."
    },
    content: {
      en: "Institutional websites with scalable structure, premium UI and conversion-focused sections.",
      "pt-BR": "Sites institucionais com estrutura escalavel, UI premium e secoes focadas em conversao."
    }
  },
  {
    slug: "seo-performance",
    title: {
      en: "SEO & Performance",
      "pt-BR": "SEO e Performance"
    },
    summary: {
      en: "Speed, structure and technical quality to rank better and convert more.",
      "pt-BR": "Velocidade, estrutura e qualidade tecnica para ranquear melhor e converter mais."
    },
    content: {
      en: "Technical audits, metadata strategy, page speed optimization and implementation of best practices.",
      "pt-BR": "Auditoria tecnica, estrategia de metadata, otimizacao de velocidade e implementacao de boas praticas."
    }
  },
  {
    slug: "maintenance-growth",
    title: {
      en: "Maintenance & Growth",
      "pt-BR": "Manutencao e Growth"
    },
    summary: {
      en: "Ongoing support, updates and campaign evolution.",
      "pt-BR": "Suporte continuo, atualizacoes e evolucao de campanhas."
    },
    content: {
      en: "Continuous site updates, performance checks and strategic improvements over time.",
      "pt-BR": "Atualizacao continua do site, revisoes de performance e melhorias estrategicas recorrentes."
    }
  }
];

export function findServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}