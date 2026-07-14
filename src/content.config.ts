import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  featured: z.boolean().default(false),
  size: z.enum(['small', 'medium', 'large', 'wide']).default('medium'),
  image: z.string().optional(),
  draft: z.boolean().default(false),
};

const poetry = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/poetry' }),
  schema: z.object({ ...common })
});

const robots = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/robots' }),
  schema: z.object({
    ...common,
    materials: z.string().optional(),
    status: z.string().optional(),
    video: z.string().optional()
  })
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/music' }),
  schema: z.object({
    ...common,
    audio: z.string().optional(),
    duration: z.string().optional()
  })
});

const video = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/video' }),
  schema: z.object({
    ...common,
    video: z.string().optional(),
    duration: z.string().optional()
  })
});

export const collections = { poetry, robots, music, video };
