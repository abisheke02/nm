import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { researchQuery } from '@/lib/queries';

type Publication = {
  title: string;
  slug: { current: string };
  abstract?: string;
  publication?: string;
  publishedAt?: string;
  externalUrl?: string;
};

export default async function ResearchPage() {
  const publications = (await sanityFetch<Publication[]>(researchQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Research & Publications" title="Textile Innovation Research" />
      {publications.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">
          No publications listed yet — add "Research Publication" documents in Sanity Studio.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {publications.map((pub) => (
            <div key={pub.slug.current} className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-6">
              <p className="mb-1 font-mono text-xs text-[var(--nm-text-muted)]">
                {pub.publication} {pub.publishedAt ? `· ${new Date(pub.publishedAt).toLocaleDateString()}` : ''}
              </p>
              <h3 className="mb-2 font-semibold">
                {pub.externalUrl ? (
                  <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              {pub.abstract && <p className="text-sm text-[var(--nm-text-muted)]">{pub.abstract}</p>}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
