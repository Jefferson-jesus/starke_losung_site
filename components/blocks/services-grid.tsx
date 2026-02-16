import { Link } from "@/lib/navigation";

type ServiceCard = {
  slug: string;
  title: string;
  description: string;
};

type Props = {
  title: string;
  subtitle: string;
  cards: ServiceCard[];
  ctaLabel: string;
};

export function ServicesGrid({ title, subtitle, cards, ctaLabel }: Props) {
  return (
    <section className="block-shell py-20">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <p className="mt-3 max-w-3xl text-[var(--color-muted)]">{subtitle}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cards.map((item) => (
          <article key={item.slug} className="card-premium animate-fade-up">
            <h3 className="text-xl font-semibold text-[var(--color-fg)]">{item.title}</h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{item.description}</p>
            <Link href={`/services/${item.slug}`} className="mt-4 inline-block text-sm text-[var(--color-fg)] underline">
              {ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}