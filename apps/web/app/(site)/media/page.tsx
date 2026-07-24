import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { mediaQuery } from '@/lib/queries';

type MediaItem = {
  title: string;
  outlet: string;
  url?: string;
  publishedAt?: string;
};

export default async function MediaPage() {
  const items = (await sanityFetch<MediaItem[]>(mediaQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Media" title="Press & Mentions" />
      {items.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">No media mentions published yet — add "Media Mention" documents in Sanity Studio.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--nm-border)]">
          {items.map((item, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <p className="font-mono text-xs uppercase text-[var(--nm-text-muted)]">{item.outlet}</p>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                    {item.title}
                  </a>
                ) : (
                  <span className="font-semibold">{item.title}</span>
                )}
              </div>
              {item.publishedAt && (
                <span className="text-xs text-[var(--nm-text-muted)]">{new Date(item.publishedAt).toLocaleDateString()}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
