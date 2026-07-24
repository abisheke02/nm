import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { awardsQuery } from '@/lib/queries';

type Award = {
  title: string;
  issuer?: string;
  year: number;
  description?: string;
};

export default async function AwardsPage() {
  const awards = (await sanityFetch<Award[]>(awardsQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Recognition" title="Awards" />
      {awards.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">No awards published yet — add "Award" documents in Sanity Studio.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {awards.map((award, i) => (
            <div key={i} className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-6">
              <p className="mb-1 font-mono text-xs text-[var(--nm-text-muted)]">
                {award.year} {award.issuer ? `· ${award.issuer}` : ''}
              </p>
              <h3 className="mb-2 font-semibold">{award.title}</h3>
              {award.description && <p className="text-sm text-[var(--nm-text-muted)]">{award.description}</p>}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
