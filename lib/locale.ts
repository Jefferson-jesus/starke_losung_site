import { cookies, headers } from "next/headers";
import { routing } from "@/i18n/routing";
import type { SupportedLocale } from "@/site.config";

export function normalizeLocale(value?: string | null): SupportedLocale | null {
  if (!value) {
    return null;
  }
  if (value === "pt" || value === "pt-BR") {
    return "pt-BR";
  }
  if (value.startsWith("en")) {
    return "en";
  }
  return null;
}

export async function detectLocaleServer(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  const fromCookie = normalizeLocale(cookieStore.get("NEXT_LOCALE")?.value);
  if (fromCookie) {
    return fromCookie;
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  const first = acceptLanguage?.split(",")[0];
  const fromHeader = normalizeLocale(first);
  if (fromHeader && routing.locales.includes(fromHeader)) {
    return fromHeader;
  }

  return "en";
}

export function getWhatsAppMessage(locale: SupportedLocale) {
  return locale === "pt-BR"
    ? "Olá! Quero um site profissional para minha empresa. Pode me passar um orçamento?"
    : "Hi! I want a professional website for my business. Can you send me a quote?";
}

export function getWhatsAppUrl(locale: SupportedLocale) {
  const number = process.env.WHATSAPP_NUMBER?.replace(/[^0-9]/g, "") || "5511979795088";
  const message = encodeURIComponent(getWhatsAppMessage(locale));
  return `https://wa.me/${number}?text=${message}`;
}