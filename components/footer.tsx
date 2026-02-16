import { useTranslations } from "next-intl";
import { siteConfig } from "@/site.config";
import { Link } from "@/lib/navigation";

type Props = {
  whatsappUrl: string;
};

export function Footer({ whatsappUrl }: Props) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="section-shell grid gap-8 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.24em] text-metal">STARKE LOSUNG</p>
          <p className="text-sm text-silver-300">{t("tagline")}</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-silver-100">{t("linksTitle")}</h2>
          <div className="grid gap-2 text-sm text-silver-300">
            <Link href="/services">{t("services")}</Link>
            <Link href="/portfolio">{t("portfolio")}</Link>
            <Link href="/pricing">{t("pricing")}</Link>
            <Link href="/about">{t("about")}</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-silver-100">{t("contactTitle")}</h2>
          <a href={`mailto:${siteConfig.contactEmail}`} className="block text-sm text-silver-300">
            {siteConfig.contactEmail}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block text-sm text-silver-300">
            WhatsApp
          </a>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase text-silver-100">{t("socialTitle")}</h2>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="block text-sm text-silver-300">
            Instagram
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="block text-sm text-silver-300">
            LinkedIn
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="block text-sm text-silver-300">
            Facebook
          </a>
        </div>
      </div>
      <div className="section-shell flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-silver-400">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <div className="flex gap-4">
          <Link href="/privacy">{t("privacy")}</Link>
          <Link href="/terms">{t("terms")}</Link>
        </div>
      </div>
    </footer>
  );
}
