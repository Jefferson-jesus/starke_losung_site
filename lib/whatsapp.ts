import type { SupportedLocale } from "@/site.config";

export type QuoteDetails = {
  name: string;
  email: string;
  country: string;
  projectType: string;
  message: string;
};

export function getWhatsAppFormUrl(number: string, locale: SupportedLocale, details: QuoteDetails) {
  const digits = number.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) {
    throw new Error("Configure a WhatsApp number with country code.");
  }
  const pt = locale === "pt-BR";
  const text = [
    pt ? "Olá! Gostaria de um orçamento para desenvolvimento de sistemas ou sites." : "Hi! I'd like a quote for software or website development.",
    "",
    `${pt ? "Nome" : "Name"}: ${details.name.trim()}`,
    `E-mail: ${details.email.trim()}`,
    `${pt ? "País" : "Country"}: ${details.country.trim()}`,
    `${pt ? "Tipo de projeto" : "Project type"}: ${details.projectType.trim()}`,
    "",
    pt ? "Descrição do projeto:" : "Project description:",
    details.message.trim()
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
