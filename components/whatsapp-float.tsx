type Props = {
  href: string;
  label: string;
};

export function WhatsAppFloat({ href, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-500 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
    >
      WA
    </a>
  );
}
