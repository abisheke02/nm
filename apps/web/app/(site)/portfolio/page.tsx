import Link from 'next/link';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { portfolioQuery } from '@/lib/queries';

type Project = {
  title: string;
  slug: { current: string };
  year?: number;
  category?: string;
  summary?: string;
};

export default async function PortfolioPage() {
  const projects = (await sanityFetch<Project[]>(portfolioQuery)) ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Portfolio" title="Fashion Projects" />
      {projects.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">
          No projects published yet — add "Fashion Project" documents in Sanity Studio.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug.current}
              href={`/projects/${project.slug.current}`}
              className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-6 hover:bg-[var(--nm-surface-2)]"
            >
              <p className="mb-1 font-mono text-xs uppercase text-[var(--nm-text-muted)]">
                {project.category} {project.year ? `· ${project.year}` : ''}
              </p>
              <h3 className="mb-2 font-semibold">{project.title}</h3>
              {project.summary && <p className="text-sm text-[var(--nm-text-muted)]">{project.summary}</p>}
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
