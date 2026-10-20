import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { siteConfig } from "@/site.config";
import { getModeInitScript } from "@/lib/site-mode";
import { isIndexable } from "@/lib/indexing";

const inter = localFont({ src: "../../public/fonts/InterLatin.woff2", display: "swap", weight: "100 900" });

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.defaultUrl),
  title: {
    default: "STARKE LOSUNG",
    template: "%s"
  },
  description: "Software and website development services for businesses worldwide.",
  openGraph: {
    title: "STARKE LOSUNG",
    description: "Software and website development services for businesses worldwide.",
    siteName: "STARKE LOSUNG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "STARKE LOSUNG",
    description: "Software and website development services for businesses worldwide."
  },
  robots: isIndexable
    ? {
        index: true,
        follow: true
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-snippet": -1,
          "max-image-preview": "none",
          "max-video-preview": -1
        }
      }
};

export function RootDocument({ children, locale }: Readonly<{ children: React.ReactNode; locale: string }>) {
  return (
    <html lang={locale} suppressHydrationWarning data-mode={siteConfig.mode.default}>
      <head>
        <script id="site-mode-init" dangerouslySetInnerHTML={{ __html: getModeInitScript(siteConfig.mode.default) }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
