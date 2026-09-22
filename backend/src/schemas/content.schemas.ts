import { z } from 'zod';
import { paginationQuerySchema } from './common.schemas.js';

export const articleListSchema = z.object({
  query: paginationQuerySchema.extend({ published: z.coerce.boolean().optional() }),
});

export const articleCreateSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2),
    slug: z.string().trim().optional(),
    excerpt: z.string().trim().min(10),
    content: z.string().trim().min(30),
    image: z.string().trim().url(),
    author: z.string().trim().min(2),
    published: z.boolean().optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

export const articleUpdateSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: articleCreateSchema.shape.body.partial(),
});

export const testimonialSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    country: z.string().trim().min(2),
    content: z.string().trim().min(10),
    rating: z.number().int().min(1).max(5),
    image: z.string().trim().url().optional(),
    published: z.boolean().optional(),
  }),
});

export const gallerySchema = z.object({
  body: z.object({
    title: z.string().trim().min(2),
    description: z.string().trim().optional(),
    imageUrl: z.string().trim().url(),
    location: z.string().trim().min(2),
    category: z.string().trim().min(2),
  }),
});

export const reviewSchema = z.object({
  body: z.object({
    journeyId: z.string().min(1).optional(),
    experienceId: z.string().min(1).optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(10),
  }).refine((data) => data.journeyId || data.experienceId, {
    message: 'A review must target a journey or an experience',
  }),
});

export const reviewModerationSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ approved: z.boolean() }),
});
