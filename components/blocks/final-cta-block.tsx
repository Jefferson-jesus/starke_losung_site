import { Link } from "@/lib/navigation";

type Props = {
  enabled: boolean;
  text: string;
  buttonLabel: string;
};

export function FinalCtaBlock({ enabled, text, buttonLabel }: Props) {
  if (!enabled) {
    return null;
  }

  return (
    <section className="block-shell pb-20">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
        <p className="mx-auto max-w-3xl text-2xl font-semibold text-[var(--color-fg)]">{text}</p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-contrast)]"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}