"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" }
] as const;

type Props = {
  showModeToggle?: boolean;
};

export function Header({ showModeToggle = false }: Props) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color:var(--header-bg)]/90 backdrop-blur-md">
      <div className="section-shell flex h-20 items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-3">
          <Image src="/logo-mark.svg" alt="STARKE LOSUNG logo" width={36} height={36} />
          <span className="text-sm font-semibold tracking-[0.25em] text-[var(--color-fg)] transition group-hover:tracking-[0.28em]">
            STARKE LOSUNG
          </span>
        </Link>

        <button
          type="button"
          className="rounded border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-fg)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {t("menu")}
        </button>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LanguageSwitcher />
          {showModeToggle && <ModeToggle />}
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-[var(--color-accent-contrast)] transition hover:-translate-y-0.5"
          >
            {t("ctaQuote")}
          </Link>
        </nav>
      </div>

      {open && (
        <nav id="mobile-menu" className="section-shell grid gap-4 border-t border-[var(--color-border)] py-4 md:hidden">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[var(--color-muted)]">
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {showModeToggle && <ModeToggle />}
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-2 text-center text-sm font-semibold text-[var(--color-accent-contrast)]"
          >
            {t("ctaQuote")}
          </Link>
        </nav>
      )}
    </header>
  );
}