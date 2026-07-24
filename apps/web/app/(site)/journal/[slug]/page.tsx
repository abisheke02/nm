import { notFound } from 'next/navigation';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { journalPostQuery } from '@/lib/queries';

type Post = {
  title: string;
  excerpt?: string;
  publishedAt?: string;
};

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<Post>(journalPostQuery, { slug });

  if (!post) notFound();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Journal'}
        title={post.title}
      />
      {post.excerpt && <p className="max-w-2xl text-[var(--nm-text-muted)]">{post.excerpt}</p>}
    </Container>
  );
}
