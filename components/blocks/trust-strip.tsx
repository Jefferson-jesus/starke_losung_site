type TrustItem = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  items: TrustItem[];
};

export function TrustStrip({ items }: Props) {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/80">
      <div className="block-shell py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4">
              <p className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-xs font-semibold text-[var(--color-fg)]">
                {item.icon}
              </p>
              <h2 className="mt-3 text-sm font-semibold text-[var(--color-fg)]">{item.title}</h2>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}