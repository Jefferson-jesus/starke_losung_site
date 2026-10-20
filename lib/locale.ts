import { siteConfig, type SupportedLocale } from "@/site.config";

export function getWhatsAppMessage(locale: SupportedLocale) {
  return locale === "pt-BR"
    ? "Olá! Gostaria de um orçamento para desenvolvimento de sistemas ou sites."
    : "Hi! I'd like a quote for software or website development.";
}

export function getWhatsAppUrl(locale: SupportedLocale) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(getWhatsAppMessage(locale))}`;
}
