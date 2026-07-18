import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'researchPublication',
  title: 'Research Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'abstract', title: 'Abstract', type: 'text' }),
    defineField({ name: 'coAuthors', title: 'Co-authors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publication', title: 'Published in', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'date' }),
    defineField({ name: 'externalUrl', title: 'External URL / DOI', type: 'url' }),
    defineField({ name: 'pdf', title: 'PDF', type: 'file' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
});
