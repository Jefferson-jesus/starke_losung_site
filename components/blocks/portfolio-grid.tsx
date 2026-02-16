import Image from "next/image";

type PortfolioCard = {
  title: string;
  category: string;
};

type Props = {
  title: string;
  cards: PortfolioCard[];
};

export function PortfolioGrid({ title, cards }: Props) {
  return (
    <section className="block-shell py-16">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((item, index) => (
          <article key={item.title} className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Image
              src={`/portfolio-${index + 1}.svg`}
              alt={item.title}
              width={1200}
              height={800}
              className="aspect-[4/3] h-auto w-full object-cover transition duration-500 hover:scale-105"
            />
            <div className="p-5">
              <h3 className="text-base font-semibold text-[var(--color-fg)]">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{item.category}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}