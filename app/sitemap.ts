import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

const pages = ["", "/services", "/portfolio", "/pricing", "/about", "/contact", "/privacy", "/terms"];
const locales = ["en", "pt-BR"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.defaultUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page ? "monthly" : "weekly",
      priority: page ? 0.7 : 1
    }))
  );
}
