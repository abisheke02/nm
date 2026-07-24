import { notFound } from 'next/navigation';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { collectionQuery } from '@/lib/queries';

type Collection = {
  title: string;
  season?: string;
};

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await sanityFetch<Collection>(collectionQuery, { slug });

  if (!collection) notFound();

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={collection.season ?? 'Collection'} title={collection.title} />
    </Container>
  );
}
