"use client";

import { useTranslations } from "next-intl";
import { useSiteMode } from "@/components/site-mode-provider";

export function ModeToggle() {
  const t = useTranslations("common");
  const { mode, toggleMode } = useSiteMode();

  return (
    <button
      type="button"
      aria-label={t("switchMode")}
      onClick={toggleMode}
      className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-fg)] transition hover:-translate-y-0.5"
    >
      {mode === "premium" ? t("modePremium") : t("modeStandard")}
    </button>
  );
}