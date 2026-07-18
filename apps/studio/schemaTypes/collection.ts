import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'season', title: 'Season', type: 'string', description: 'e.g. Spring/Summer 2027' }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'linkedProducts',
      title: 'Linked shop product IDs',
      description: 'Medusa product IDs for pieces from this collection that are sold in the shop',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
  ],
});
