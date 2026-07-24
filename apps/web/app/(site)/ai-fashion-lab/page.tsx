import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { pageQuery } from '@/lib/queries';

type Page = { title?: string; intro?: string };

export default async function AiFashionLabPage() {
  const page = await sanityFetch<Page>(pageQuery, { slug: 'ai-fashion-lab' });

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Studio" title={page?.title ?? 'AI Fashion Lab'} />
      <p className="max-w-2xl text-[var(--nm-text-muted)]">
        {page?.intro ?? 'This page is managed in Sanity Studio under the "AI Fashion Lab" page document.'}
      </p>
    </Container>
  );
}
