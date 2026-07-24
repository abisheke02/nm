import Link from 'next/link';
import { Container, SectionHeading, LinkButton } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { pageQuery } from '@/lib/queries';

type HomePage = {
  title?: string;
  intro?: string;
};

export default async function HomePage() {
  const page = await sanityFetch<HomePage>(pageQuery, { slug: 'home' });

  return (
    <>
      <section className="border-b border-[var(--nm-border)] py-16 sm:py-24">
        <Container>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--nm-accent)]">
            Fashion design studio
          </p>
          <h1
            className="max-w-2xl text-balance text-4xl font-semibold italic leading-tight sm:text-6xl"
            style={{ fontFamily: 'var(--nm-font-serif)' }}
          >
            {page?.title ?? 'Nithya MuthuKrishnan'}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--nm-text-muted)]">
            {page?.intro ??
              'Portfolio, collections, and research from the studio — plus a shop for pieces available now.'}
          </p>
          <div className="mt-8 flex gap-4">
            <LinkButton href="/portfolio">View Portfolio</LinkButton>
            <LinkButton variant="outline" href="/shop">
              Shop the collection
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Explore" title="Where to start" />
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { href: '/collections', label: 'Collections', desc: 'Seasonal stories and galleries.' },
              { href: '/journal', label: 'Journal', desc: 'Notes from the studio.' },
              { href: '/research', label: 'Research', desc: 'Published work on textile innovation.' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-6 transition-colors hover:bg-[var(--nm-surface-2)]"
              >
                <h3 className="mb-1 font-semibold">{item.label}</h3>
                <p className="text-sm text-[var(--nm-text-muted)]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
