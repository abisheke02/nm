import { notFound } from 'next/navigation';
import { Container, SectionHeading } from '@nithya/ui';
import { sanityFetch } from '@/lib/sanity';
import { fashionProjectQuery } from '@/lib/queries';

type Project = {
  title: string;
  year?: number;
  category?: string;
  summary?: string;
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await sanityFetch<Project>(fashionProjectQuery, { slug });

  if (!project) notFound();

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={project.category ?? 'Fashion Project'} title={project.title} />
      {project.summary && <p className="max-w-2xl text-[var(--nm-text-muted)]">{project.summary}</p>}
    </Container>
  );
}
