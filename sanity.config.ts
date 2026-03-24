import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_API_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  'f8odcwd1'

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_API_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'default',
  title: 'Saltros CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
