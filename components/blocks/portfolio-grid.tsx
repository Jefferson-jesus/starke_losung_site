import Image from "next/image";

import Link from "next/link";
import type { PortfolioProject } from "@/lib/portfolio";

type Props = {
  title: string;
  subtitle?: string;
  projects: PortfolioProject[];
  labels: { live: string; demo: string; visit: string; explore: string };
};

export function PortfolioGrid({ title, subtitle, projects, labels }: Props) {
  return (
    <section className="block-shell py-16">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl text-[var(--color-muted)]">{subtitle}</p>}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((item) => (
          <article key={item.id} className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
              className="aspect-[3/2] h-auto w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <span className="self-start rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-fg)]">
                {labels[item.kind]}
              </span>
              <p className="mt-4 text-xs uppercase tracking-wider text-[var(--color-muted)]">{item.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-fg)]">{item.title}</h3>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.description}</p>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto self-start rounded-sm text-sm font-medium text-[var(--color-fg)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {labels.visit}<span className="sr-only">: {item.title}</span> <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="mt-auto self-start rounded-sm text-sm font-medium text-[var(--color-fg)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {labels.explore}<span className="sr-only">: {item.title}</span> <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
