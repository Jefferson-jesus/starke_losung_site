type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  items: FaqItem[];
};

export function FaqBlock({ title, items }: Props) {
  return (
    <section className="block-shell py-16">
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <details key={item.question} className="card-premium group">
            <summary className="cursor-pointer list-none text-base font-semibold text-[var(--color-fg)]">{item.question}</summary>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}