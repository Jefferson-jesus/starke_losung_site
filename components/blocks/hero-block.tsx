import Image from "next/image";
import { Link } from "@/lib/navigation";

type Props = {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  socialProof: string;
  rightCardTitle: string;
  rightCardSubtitle: string;
  bullets: string[];
};

export function HeroBlock({
  kicker,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  socialProof,
  rightCardTitle,
  rightCardSubtitle,
  bullets
}: Props) {
  return (
    <section className="block-shell grid gap-10 py-20 md:grid-cols-2 md:py-28">
      <div className="space-y-6 animate-fade-up">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">{kicker}</p>
        <h1 className="text-4xl font-semibold leading-tight text-metal sm:text-5xl">{title}</h1>
        <p className="max-w-xl text-base text-[var(--color-muted)] sm:text-lg">{subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-contrast)] transition hover:-translate-y-0.5"
          >
            {primaryCta}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-fg)] transition hover:border-[var(--color-accent)]"
          >
            {secondaryCta}
          </Link>
        </div>
        <p className="text-sm text-[var(--color-muted)]">{socialProof}</p>
      </div>

      <div className="card-premium animate-fade-up">
        <div className="space-y-5">
          <Image src="/logo-mark.svg" alt="STARKE LOSUNG mark" width={72} height={72} className="mx-auto" />
          <h2 className="text-center text-xl font-semibold text-[var(--color-fg)]">{rightCardTitle}</h2>
          <p className="text-center text-sm text-[var(--color-muted)]">{rightCardSubtitle}</p>
          <ul className="space-y-2 text-sm text-[var(--color-fg)]">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}