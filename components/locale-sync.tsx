"use client";

import { useEffect } from "react";

type Props = {
  locale: "en" | "pt-BR";
};

function resolveLocale(input: string | null) {
  if (!input) {
    return null;
  }
  if (input === "pt" || input === "pt-BR") {
    return "pt-BR";
  }
  if (input.startsWith("en")) {
    return "en";
  }
  return null;
}

export function LocaleSync({ locale }: Props) {
  useEffect(() => {
    const stored = resolveLocale(localStorage.getItem("preferred-locale"));
    const browser = resolveLocale(navigator.language);
    const selected = stored || browser || "en";

    document.cookie = `NEXT_LOCALE=${selected}; path=/; max-age=31536000`;

    if (stored !== selected) {
      localStorage.setItem("preferred-locale", selected);
    }

    if (selected !== locale) {
      const [, , ...rest] = window.location.pathname.split("/");
      const suffix = rest.length ? `/${rest.join("/")}` : "";
      window.location.replace(`/${selected}${suffix}${window.location.search}`);
    }
  }, [locale]);

  return null;
}
