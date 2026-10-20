export const siteConfig = {
  name: "STARKE LOSUNG",
  defaultUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://starkelosung.com",
  contactEmail: process.env.CONTACT_EMAIL || "hello@starkelosung.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+5511979795088",
  mode: {
    default: (process.env.NEXT_PUBLIC_SITE_MODE === "premium" ? "premium" : "standard") as "standard" | "premium",
    showToggle:
      process.env.NEXT_PUBLIC_SHOW_MODE_TOGGLE === "true" || process.env.NODE_ENV !== "production",
    showProcessInStandard: true
  },
  campaignBanner: {
    enabled: true,
    text_pt: "Desenvolvimento de sistemas e sites. Solicite uma proposta para o seu projeto.",
    text_en: "Software and website development. Request a proposal for your project.",
    link: "/pricing"
  },
  midCta: {
    enabled: true,
    text_pt: "Pronto para escalar sua presenca digital com estrutura pronta para anuncios?",
    text_en: "Ready to scale your digital presence with an ads-ready structure?"
  },
  finalCta: {
    enabled: true,
    text_pt: "Vamos criar um site premium para transformar visitas em oportunidades reais.",
    text_en: "Let's build a website that turns visitors into clients."
  },
  social: {
    instagram: process.env.SOCIAL_INSTAGRAM_URL || "",
    linkedin: process.env.SOCIAL_LINKEDIN_URL || "",
    facebook: process.env.SOCIAL_FACEBOOK_URL || ""
  },
  content: { showTestimonials: false, showCaseStudy: false }
};

export type SupportedLocale = "en" | "pt-BR";
