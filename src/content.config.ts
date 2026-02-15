import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slides = defineCollection({
  loader: glob({
    pattern: '**/slides.md',
    base: 'public/slides',
    generateId: ({ entry }) => {
      // Use parent folder name as ID: "example_lecture/slides.md" → "example_lecture"
      const parts = entry.split('/');
      return parts.length > 1 ? parts[parts.length - 2] : parts[0].replace('.md', '');
    },
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = { slides };
