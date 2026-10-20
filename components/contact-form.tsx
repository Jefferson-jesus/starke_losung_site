"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { getWhatsAppFormUrl } from "@/lib/whatsapp";

type Props = {
  locale: "en" | "pt-BR";
  whatsappNumber: string;
  compact?: boolean;
};

export function ContactForm({ locale, whatsappNumber, compact = false }: Props) {
  const t = useTranslations("contactForm");
  const [hasError, setHasError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setHasError(false);
    try {
      const url = getWhatsAppFormUrl(whatsappNumber, locale, {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        country: String(data.get("country") || ""),
        projectType: String(data.get("projectType") || ""),
        message: String(data.get("message") || "")
      });
      window.location.assign(url);
    } catch {
      setHasError(true);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`card-premium ${compact ? "space-y-4" : "space-y-5"}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-silver-200">
          {t("name")}
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm text-silver-200">
          {t("email")}
          <input name="email" type="email" autoComplete="email" required maxLength={254} className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-silver-200">
          {t("country")}
          <input name="country" autoComplete="country-name" required minLength={2} maxLength={100} className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm text-silver-200">
          {t("projectType")}
          <select name="projectType" required defaultValue="" className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2">
            <option value="">{t("selectType")}</option>
            <option>{t("typeSystem")}</option>
            <option>{t("typeInstitutional")}</option>
            <option>{t("typeLanding")}</option>
            <option>{t("typeEcommerce")}</option>
            <option>{t("typeCustom")}</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm text-silver-200">
        {t("message")}
        <textarea name="message" required minLength={10} maxLength={2000} rows={compact ? 4 : 5} className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
      </label>
      <p className="text-xs leading-relaxed text-silver-300">{t("whatsappHint")}</p>
      <p className="text-xs leading-relaxed text-silver-300">
        {t("privacyNotice")} <Link href="/privacy" className="underline">{t("privacyLink")}</Link>
      </p>
      <button type="submit" className="rounded-full border border-emerald-300/70 bg-emerald-500 px-6 py-3 text-sm font-semibold text-graphite-900 transition hover:bg-emerald-300">
        {t("submit")}
      </button>
      {hasError && <p role="alert" className="text-sm text-red-300">{t("error")}</p>}
    </form>
  );
}
