
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Alignment options
const alignment = z
  .enum(['left', 'center', 'right'])
  .default('left');

// Media sizes
const mediaSize = z
  .enum(['small', 'medium', 'large', 'full'])
  .default('medium');

// Text block
const textBlock = z.object({
  type: z.literal('text'),
  text: z.string(),
  size: z
    .enum(['small', 'normal', 'large'])
    .default('normal'),
  alignment
});

// Image block
const imageBlock = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  size: mediaSize,
  alignment: alignment.default('center')
});

// Audio block
const audioBlock = z.object({
  type: z.literal('audio'),
  src: z.string(),
  caption: z.string().optional(),
  size: mediaSize.default('large'),
  alignment: alignment.default('center')
});

// Video block
const videoBlock = z.object({
  type: z.literal('video'),
  src: z.string(),
  caption: z.string().optional(),
  size: mediaSize.default('large'),
  alignment: alignment.default('center')
});

// All available block types
const block = z.discriminatedUnion('type', [
  textBlock,
  imageBlock,
  audioBlock,
  videoBlock
]);

// Universal post schema
const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
  blocks: z.array(block).optional().default([])
});

// One collection for everything
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
