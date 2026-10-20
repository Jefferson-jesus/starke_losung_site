"use client";

import { useEffect } from "react";

type Props = {
  locale: "en" | "pt-BR";
};

export function LocaleSync({ locale }: Props) {
  useEffect(() => {
    // An explicit /pt-BR or /en URL always wins. Root detection lives in middleware.
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax${secure}`;
    try { localStorage.setItem("preferred-locale", locale); } catch { /* Storage may be blocked. */ }
  }, [locale]);

  return null;
}
