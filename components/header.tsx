"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" }
] as const;

export function Header() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-graphite-900/90 backdrop-blur">
      <div className="section-shell flex h-20 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-mark.svg" alt="STARKE LOSUNG logo" width={36} height={36} />
          <span className="text-sm font-semibold tracking-[0.25em] text-silver-200">STARKE LOSUNG</span>
        </Link>

        <button
          type="button"
          className="rounded border border-white/20 px-3 py-2 text-xs text-silver-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {t("menu")}
        </button>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-silver-200 transition hover:text-silver-100">
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full border border-silver-200 bg-silver-200 px-5 py-2 text-sm font-semibold text-graphite-900 transition hover:-translate-y-0.5 hover:bg-white"
          >
            {t("ctaQuote")}
          </Link>
        </nav>
      </div>

      {open && (
        <nav id="mobile-menu" className="section-shell grid gap-4 border-t border-white/10 py-4 md:hidden">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-silver-200">
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full border border-silver-200 bg-silver-200 px-5 py-2 text-center text-sm font-semibold text-graphite-900"
          >
            {t("ctaQuote")}
          </Link>
        </nav>
      )}
    </header>
  );
}
