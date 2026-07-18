import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_PROJECT_ID || 'placeholder-project-id';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'nithya-muthukrishnan',
  title: 'Nithya MuthuKrishnan',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
