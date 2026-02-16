"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function onChange(nextLocale: string) {
    localStorage.setItem("preferred-locale", nextLocale);
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="flex items-center gap-2 text-xs text-silver-200" aria-label={t("languageLabel")}>
      <span className="hidden sm:inline">{t("language")}</span>
      <select
        className="rounded-md border border-white/20 bg-graphite-800 px-2 py-1"
        value={locale}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="en">EN</option>
        <option value="pt-BR">PT-BR</option>
      </select>
    </label>
  );
}
