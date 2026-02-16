type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type Props = {
  title: string;
  items: Testimonial[];
};

export function TestimonialsBlock({ title, items }: Props) {
  return (
    <section className="block-shell py-16">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={`${item.name}-${item.role}`} className="card-premium">
            <p className="text-sm text-[var(--color-fg)]">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-5 text-sm font-semibold text-[var(--color-fg)]">{item.name}</p>
            <p className="text-xs text-[var(--color-muted)]">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}