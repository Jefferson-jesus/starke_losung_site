export const siteConfig = {
  name: "STARKE LOSUNG",
  defaultUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://starkelosung.com",
  contactEmail: process.env.CONTACT_EMAIL || "hello@starkelosung.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+5511979795088",
  mode: {
    default: (process.env.NEXT_PUBLIC_SITE_MODE === "premium" ? "premium" : "standard") as "standard" | "premium",
    showToggle:
      process.env.NEXT_PUBLIC_SHOW_MODE_TOGGLE === "true" || process.env.VERCEL_ENV !== "production",
    showProcessInStandard: true
  },
  campaignBanner: {
    enabled: true,
    text_pt: "Oferta mensal: Landing page premium + WhatsApp + SEO tecnico inicial.",
    text_en: "Monthly deal: Premium landing page + WhatsApp + initial technical SEO.",
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
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com"
  }
};

export type SupportedLocale = "en" | "pt-BR";