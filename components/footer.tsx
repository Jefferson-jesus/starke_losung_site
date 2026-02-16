import { useTranslations } from "next-intl";
import { siteConfig } from "@/site.config";
import { Link } from "@/lib/navigation";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {
  whatsappUrl: string;
  showModeToggle?: boolean;
};

export function Footer({ whatsappUrl, showModeToggle = false }: Props) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm">
      <div className="section-shell grid gap-8 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.24em] text-metal">STARKE LOSUNG</p>
          <p className="text-sm text-[var(--color-muted)]">{t("tagline")}</p>
          {showModeToggle && <ModeToggle />}
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-[var(--color-fg)]">{t("linksTitle")}</h2>
          <div className="grid gap-2 text-sm text-[var(--color-muted)]">
            <Link href="/services">{t("services")}</Link>
            <Link href="/portfolio">{t("portfolio")}</Link>
            <Link href="/pricing">{t("pricing")}</Link>
            <Link href="/about">{t("about")}</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-[var(--color-fg)]">{t("contactTitle")}</h2>
          <a href={`mailto:${siteConfig.contactEmail}`} className="block text-sm text-[var(--color-muted)]">
            {siteConfig.contactEmail}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)]">
            WhatsApp
          </a>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-[var(--color-fg)]">{t("socialTitle")}</h2>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)]">
            Instagram
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)]">
            LinkedIn
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)]">
            Facebook
          </a>
        </div>
      </div>
      <div className="section-shell flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] py-5 text-xs text-[var(--color-muted)]">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex gap-4">
          <Link href="/privacy">{t("privacy")}</Link>
          <Link href="/terms">{t("terms")}</Link>
        </div>
      </div>
    </footer>
  );
}