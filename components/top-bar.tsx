import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/lib/navigation";

export function TopBar() {
  const t = useTranslations("topbar");

  return (
    <div className="border-b border-white/10 bg-black/20">
      <div className="section-shell flex min-h-10 items-center justify-between gap-3 py-2">
        <p className="text-xs text-silver-200">{t("international")}</p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-xs text-silver-100 transition hover:text-silver-300">
            {t("emailCta")}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
