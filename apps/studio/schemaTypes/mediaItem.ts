import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mediaItem',
  title: 'Media Mention',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'outlet', title: 'Outlet', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'outletLogo', title: 'Outlet logo', type: 'image' }),
    defineField({ name: 'url', title: 'External URL', type: 'url' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'date' }),
  ],
});
