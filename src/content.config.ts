import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const alignment = z
  .enum(['left', 'center', 'right'])
  .default('left');

const mediaSize = z
  .enum(['small', 'medium', 'large', 'full'])
  .default('medium');

const textBlock = z.object({
  type: z.literal('text'),
  text: z.string(),
  alignment
});

const imageBlock = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  size: mediaSize,
  alignment: alignment.default('center')
});

const audioBlock = z.object({
  type: z.literal('audio'),
  src: z.string(),
  caption: z.string().optional(),
  size: mediaSize.default('large'),
  alignment: alignment.default('center')
});

const videoBlock = z.object({
  type: z.literal('video'),
  src: z.string(),
  caption: z.string().optional(),
  size: mediaSize.default('large'),
  alignment: alignment.default('center')
});

const block = z.discriminatedUnion('type', [
  textBlock,
  imageBlock,
  audioBlock,
  videoBlock
]);

const commonSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional().default(''),
  draft: z.boolean().default(false),

  blocks: z.array(block).optional().default([]),

  /*
   * Old fields remain optional so your existing posts
   * do not break during the transition.
   */
  featured: z.boolean().optional(),
  size: z
    .enum(['small', 'medium', 'large', 'wide'])
    .optional(),

  image: z.string().optional(),
  audio: z.string().optional(),
  video: z.string().optional(),

  duration: z.string().optional(),
  materials: z.string().optional(),
  status: z.string().optional()
});

const poetry = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/poetry'
  }),
  schema: commonSchema
});

const robots = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/robots'
  }),
  schema: commonSchema
});

const music = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/music'
  }),
  schema: commonSchema
});

export const collections = {
  poetry,
  robots,
  music
};