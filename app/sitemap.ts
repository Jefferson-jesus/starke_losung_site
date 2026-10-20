import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { services } from "@/lib/services";

const pages = [
  "",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/portfolio",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms"
];
const locales = ["en", "pt-BR"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.defaultUrl}/${locale}${page}`,
      alternates: {
        languages: Object.fromEntries(locales.map((language) => [language, `${siteConfig.defaultUrl}/${language}${page}`]))
      },
      changeFrequency: page ? "monthly" : "weekly",
      priority: page ? 0.7 : 1
    }))
  );
}
