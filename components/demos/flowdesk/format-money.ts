import type { DemoLocale } from "./model";

// Formatting only: totals and validation remain in the domain model. Keeping
// whole units as an integer avoids rounding away a cent near MAX_SAFE_INTEGER.
export function formatDemoMoney(cents: number, locale: DemoLocale): string {
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: locale === "pt-BR" ? "BRL" : "USD" });
  const fraction = String(cents % 100).padStart(2, "0");
  return formatter.formatToParts(BigInt(cents) / 100n)
    .map(part => part.type === "fraction" ? fraction : part.value).join("");
}
