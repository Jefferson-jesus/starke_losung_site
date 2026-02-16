import { ContactForm } from "@/components/contact-form";

type Props = {
  title: string;
  subtitle: string;
  whatsappUrl: string;
  whatsappLabel: string;
  emailLabel: string;
  email: string;
  locale: "en" | "pt-BR";
  turnstileSiteKey?: string;
};

export function ContactBlock({
  title,
  subtitle,
  whatsappUrl,
  whatsappLabel,
  emailLabel,
  email,
  locale,
  turnstileSiteKey
}: Props) {
  return (
    <section id="contact" className="block-shell grid gap-8 pb-24 md:grid-cols-[1fr,1.2fr]">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-metal">{title}</h2>
        <p className="text-[var(--color-muted)]">{subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-300/70 bg-emerald-500 px-6 py-3 text-sm font-semibold text-white"
          >
            {whatsappLabel}
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-fg)]"
          >
            {emailLabel}
          </a>
        </div>
      </div>
      <ContactForm locale={locale} compact turnstileSiteKey={turnstileSiteKey} />
    </section>
  );
}