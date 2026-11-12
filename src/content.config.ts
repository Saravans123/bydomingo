
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const textBlock = z.object({
  type: z.literal('text'),
  text: z.string().default(''),
  size: z.enum(['small', 'normal', 'large']).default('normal'),
  alignment: z.enum(['left', 'center', 'right']).default('left')
});

const imageBlock = z.object({
  type: z.literal('image'),
  src: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  size: z.enum(['small', 'medium', 'large', 'full']).default('medium'),
  alignment: z.enum(['left', 'center', 'right']).default('center')
});

const audioBlock = z.object({
  type: z.literal('audio'),
  src: z.string(),
  caption: z.string().optional(),
  size: z.enum(['small', 'medium', 'large', 'full']).default('large'),
  alignment: z.enum(['left', 'center', 'right']).default('center')
});

const videoBlock = z.object({
  type: z.literal('video'),
  src: z.string(),
  caption: z.string().optional(),
  size: z.enum(['small', 'medium', 'large', 'full']).default('large'),
  alignment: z.enum(['left', 'center', 'right']).default('center')
});

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts'
  }),

  schema: z.object({
    title: z.string(),

    date: z.coerce.date(),

    category: z.enum([
      'Poetry',
      'Robot',
      'Music'
    ]).optional(),

    draft: z.boolean().default(false),

    backgroundImage: z.string().optional(),

    // Existing posts without this field use 40%.
    backgroundTransparency: z.preprocess(
      (value) => {
        if (
          value === undefined ||
          value === null ||
          value === ''
        ) {
          return 40;
        }

        return value;
      },
      z.coerce.number().min(0).max(100)
    ),

    blocks: z.array(
      z.discriminatedUnion('type', [
        textBlock,
        imageBlock,
        audioBlock,
        videoBlock
      ])
    ).default([])
  })
});

export const collections = {
  posts
};
