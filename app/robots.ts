import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { isIndexable } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.defaultUrl}/sitemap.xml`
  };
}
