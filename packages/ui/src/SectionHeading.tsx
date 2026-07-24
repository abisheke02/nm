export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--nm-accent)] before:h-[7px] before:w-[7px] before:bg-[var(--nm-accent)]">
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className="text-balance text-3xl font-semibold italic sm:text-4xl"
        style={{ fontFamily: 'var(--nm-font-serif)' }}
      >
        {title}
      </h2>
    </div>
  );
}
