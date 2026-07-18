import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brandSettings',
  title: 'Brand Settings',
  type: 'document',
  fields: [
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'logoDark', title: 'Logo (dark background)', type: 'image' }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({ name: 'footerText', title: 'Footer text', type: 'text' }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
  ],
  preview: {
    prepare() {
      return { title: 'Brand Settings' };
    },
  },
});
