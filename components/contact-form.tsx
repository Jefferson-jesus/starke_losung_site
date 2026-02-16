"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  locale: "en" | "pt-BR";
  compact?: boolean;
  turnstileSiteKey?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ locale, compact = false, turnstileSiteKey }: Props) {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={`card-premium ${compact ? "space-y-4" : "space-y-5"}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-silver-200">
          {t("name")}
          <input name="name" required className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm text-silver-200">
          {t("email")}
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-silver-200">
          {t("country")}
          <input name="country" required className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm text-silver-200">
          {t("projectType")}
          <select name="projectType" required className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2">
            <option value="">{t("selectType")}</option>
            <option value="institutional">{t("typeInstitutional")}</option>
            <option value="landing">{t("typeLanding")}</option>
            <option value="seo">{t("typeEcommerce")}</option>
            <option value="maintenance">{t("typeCustom")}</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm text-silver-200">
        {t("message")}
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2"
        />
      </label>

      <label className="grid gap-2 text-xs text-silver-300">
        {t("turnstile")}
        <input
          name="turnstileToken"
          placeholder={turnstileSiteKey ? `site-key: ${turnstileSiteKey}` : "token-placeholder"}
          className="rounded-lg border border-white/20 bg-graphite-800 px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full border border-silver-200 bg-silver-200 px-6 py-3 text-sm font-semibold text-graphite-900 transition hover:bg-white disabled:opacity-70"
      >
        {status === "loading" ? t("sending") : t("submit")}
      </button>

      {status === "success" && <p className="text-sm text-emerald-300">{t("success")}</p>}
      {status === "error" && <p className="text-sm text-red-300">{t("error")}</p>}
    </form>
  );
}