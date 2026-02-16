import { Link } from "@/lib/navigation";

type Props = {
  enabled: boolean;
  label: string;
  text: string;
  link: string;
  linkLabel: string;
};

export function CampaignBanner({ enabled, label, text, link, linkLabel }: Props) {
  if (!enabled) {
    return null;
  }

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/80">
      <div className="block-shell flex flex-wrap items-center justify-between gap-4 py-3 text-sm">
        <p className="text-[var(--color-muted)]">
          <span className="mr-2 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs uppercase text-[var(--color-fg)]">
            {label}
          </span>
          {text}
        </p>
        <Link href={link} className="text-[var(--color-fg)] underline underline-offset-4">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}