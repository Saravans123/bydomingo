
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
  size: z.enum(['small', 'normal', 'large']).default('normal'),
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

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),

  // Optional background image for each post
  backgroundImage: z.string().nullish(),

  blocks: z.array(block).optional().default([])
});

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts'
  }),
  schema: postSchema
});

export const collections = {
  posts
};
