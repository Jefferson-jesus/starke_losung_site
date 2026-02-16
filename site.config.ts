export const siteConfig = {
  name: "STARKE LOSUNG",
  defaultUrl: "https://starkelosung.com",
  contactEmail: process.env.CONTACT_EMAIL || "hello@starkelosung.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+5511979795088",
  campaignBanner: {
    enabled: true,
    text_pt: "Campanha internacional: landing page premium + SEO técnico com condição especial.",
    text_en: "International campaign: premium landing page + technical SEO with special conditions.",
    link: "/pricing"
  },
  midCta: {
    enabled: true,
    text_pt: "Quer acelerar sua presença digital com execução completa?",
    text_en: "Want to accelerate your digital presence with end-to-end execution?"
  },
  finalCta: {
    enabled: true,
    text_pt: "Vamos construir um site que converte visitantes em clientes.",
    text_en: "Let's build a website that turns visitors into clients."
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com"
  }
};

export type SupportedLocale = "en" | "pt-BR";
