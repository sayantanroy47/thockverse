import { defineCollection, z } from 'astro:content';

// Define the schema for switch reviews
const switchesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string().or(z.date()),
    category: z.string(),
    tags: z.array(z.string()),
    specs: z.object({
      actuationforce: z.string().optional(),
      bottomoutforce: z.string().optional(),
      pretravel: z.string().optional(),
      totaltravel: z.string().optional(),
      sound: z.string().optional(),
      material: z.string().optional(),
      mounttype: z.string().optional(),
      factorylubed: z.string().optional(),
      housing: z.string().optional(),
      stemcolor: z.string().optional(),
    }).optional(),
    heroImage: z.string().optional(),
    rating: z.number().min(0).max(10).optional(),
    price: z.string().optional(),
    manufacturer: z.string().optional(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Define the schema for tutorials and guides
const tutorialsCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string().or(z.date()),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    estimatedTime: z.string().optional(),
    tools: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Define the schema for news articles
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string().or(z.date()),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    source: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Export all collections
export const collections = {
  switches: switchesCollection,
  tutorials: tutorialsCollection,
  news: newsCollection,
};