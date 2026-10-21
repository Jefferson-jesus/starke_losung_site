import { getTranslations } from "next-intl/server";
import { getWhatsAppUrl } from "@/lib/locale";
import type { PortfolioProjectId } from "@/lib/portfolio";
import type { SupportedLocale } from "@/site.config";
import styles from "./demo-toolbar.module.css";

export function getDemoQuoteUrl(locale: SupportedLocale, projectName: string) {
  const url = new URL(getWhatsAppUrl(locale));
  url.searchParams.set("text", locale === "pt-BR"
    ? `Olá, STARKE LOSUNG! Gostaria de um orçamento para um projeto semelhante ao modelo ${projectName}.`
    : `Hi, STARKE LOSUNG! I'd like a quote for a project similar to the ${projectName} demo.`);
  return url.toString();
}

export async function DemoToolbar({ locale, slug, projectName }: {
  locale: SupportedLocale;
  slug: Exclude<PortfolioProjectId, "jrd">;
  projectName: string;
}) {
  const t = await getTranslations({ locale, namespace: "demoToolbar" });
  return (
    <nav className={styles.toolbar} aria-label={t("label")}>
      <a href={`/${locale}/portfolio`} className={styles.back}>← {t("back")}</a>
      <span className={styles.identity}><strong>{t("badge")}</strong><span>{projectName} · {t("fictional")}</span></span>
      <div className={styles.actions}>
        <div className={styles.languages} aria-label={t("language")}>
          <a href={`/pt-BR/demos/${slug}`} lang="pt-BR" hrefLang="pt-BR" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</a>
          <a href={`/en/demos/${slug}`} lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
        </div>
        <a className={styles.quote} href={getDemoQuoteUrl(locale, projectName)} target="_blank" rel="noreferrer">{t("quote")} <span aria-hidden="true">↗</span></a>
      </div>
    </nav>
  );
}
