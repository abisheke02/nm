import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { pageQuery } from '@/lib/queries';

type AboutPage = {
  title?: string;
  intro?: string;
};

export default async function AboutPage() {
  const page = await sanityFetch<AboutPage>(pageQuery, { slug: 'about' });

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="About" title={page?.title ?? 'About Nithya MuthuKrishnan'} />
      <p className="max-w-2xl text-[var(--nm-text-muted)]">
        {page?.intro ?? 'This page is managed in Sanity Studio under the "About" page document.'}
      </p>
    </Container>
  );
}
