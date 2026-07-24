import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { pageQuery } from '@/lib/queries';

type Page = { title?: string; intro?: string };

export default async function TextileInnovationPage() {
  const page = await sanityFetch<Page>(pageQuery, { slug: 'textile-innovation' });

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Research" title={page?.title ?? 'Textile Innovation'} />
      <p className="max-w-2xl text-[var(--nm-text-muted)]">
        {page?.intro ?? 'This page is managed in Sanity Studio under the "Textile Innovation" page document.'}
      </p>
    </Container>
  );
}
