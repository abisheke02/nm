import Link from 'next/link';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { collectionsQuery } from '@/lib/queries';

type Collection = {
  title: string;
  slug: { current: string };
  season?: string;
};

export default async function CollectionsPage() {
  const collections = (await sanityFetch<Collection[]>(collectionsQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Collections" title="Seasonal Collections" />
      {collections.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">
          No collections published yet — add "Collection" documents in Sanity Studio.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug.current}
              href={`/collections/${collection.slug.current}`}
              className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-6 hover:bg-[var(--nm-surface-2)]"
            >
              {collection.season && (
                <p className="mb-1 font-mono text-xs uppercase text-[var(--nm-text-muted)]">{collection.season}</p>
              )}
              <h3 className="font-semibold">{collection.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
