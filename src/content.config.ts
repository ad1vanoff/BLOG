import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Builds this article should promote (shown as a callout + at the end). */
    builds: z.array(reference('builds')).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    hero: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const builds = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/builds' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().max(120),
    status: z.enum(['live', 'beta', 'building', 'archived']).default('building'),
    platform: z.array(z.enum(['web', 'ios', 'android', 'cli', 'library', 'game'])).default(['web']),
    url: z.string().url().optional(),
    appStore: z.string().url().optional(),
    playStore: z.string().url().optional(),
    repo: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(100),
    featured: z.boolean().default(false),
    accent: z.string().optional(),
  }),
});

export const collections = { articles, notes, builds };
