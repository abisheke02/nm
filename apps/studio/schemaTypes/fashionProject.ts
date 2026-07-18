import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'fashionProject',
  title: 'Fashion Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Editorial', 'Collaboration', 'Installation', 'Research'] } }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'credits', title: 'Credits', type: 'array', of: [{ type: 'string' }] }),
  ],
});
