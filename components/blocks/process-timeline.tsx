type ProcessStep = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  steps: ProcessStep[];
  showInStandard?: boolean;
};

export function ProcessTimeline({ title, steps, showInStandard = true }: Props) {
  return (
    <section className={`block-shell py-20 ${showInStandard ? "" : "mode-premium"}`}>
      <h2 className="text-3xl font-semibold text-metal">{title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.title} className="card-premium">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">0{index + 1}</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--color-fg)]">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}