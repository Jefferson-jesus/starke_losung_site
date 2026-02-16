export type SiteMode = "standard" | "premium";

export const SITE_MODE_COOKIE = "SITE_MODE";

export function resolveSiteMode(value?: string | null): SiteMode | null {
  if (value === "standard" || value === "premium") {
    return value;
  }
  return null;
}