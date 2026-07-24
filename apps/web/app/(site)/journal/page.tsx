import Link from 'next/link';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { journalListQuery } from '@/lib/queries';

type Post = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

export default async function JournalPage() {
  const posts = (await sanityFetch<Post[]>(journalListQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Journal" title="Notes from the Studio" />
      {posts.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">No posts published yet — add "Journal Post" documents in Sanity Studio.</p>
      ) : (
        <div className="flex flex-col divide-y divide-[var(--nm-border)]">
          {posts.map((post) => (
            <Link key={post.slug.current} href={`/journal/${post.slug.current}`} className="py-6">
              {post.publishedAt && (
                <p className="mb-1 font-mono text-xs text-[var(--nm-text-muted)]">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
              <h3 className="mb-1 text-lg font-semibold">{post.title}</h3>
              {post.excerpt && <p className="text-sm text-[var(--nm-text-muted)]">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
