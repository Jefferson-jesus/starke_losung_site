import { Link } from "@/lib/navigation";

type Props = {
  label: string;
  title: string;
  description: string;
  cta: string;
};

export function CaseStudyHighlight({ label, title, description, cta }: Props) {
  return (
    <section className="block-shell mode-premium py-6">
      <div className="card-premium grid gap-6 md:grid-cols-[1.4fr,1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">{label}</p>
          <h2 className="mt-2 text-2xl font-semibold text-metal">{title}</h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{description}</p>
        </div>
        <div className="md:text-right">
          <Link
            href="/portfolio"
            className="inline-block rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-contrast)]"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}