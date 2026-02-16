type WhyItem = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  items: WhyItem[];
};

export function WhyUsBlock({ title, items }: Props) {
  return (
    <section className="block-shell py-12">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.title} className="card-premium">
            <h3 className="text-lg font-semibold text-[var(--color-fg)]">{item.title}</h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}