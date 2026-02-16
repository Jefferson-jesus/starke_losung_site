type Props = {
  title: string;
  subtitle: string;
};

export function PageIntro({ title, subtitle }: Props) {
  return (
    <section className="section-shell py-16 md:py-20">
      <h1 className="text-4xl font-semibold text-metal">{title}</h1>
      <p className="mt-4 max-w-3xl text-silver-200">{subtitle}</p>
    </section>
  );
}
