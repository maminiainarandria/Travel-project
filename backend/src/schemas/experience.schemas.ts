import { z } from 'zod';
import { money, paginationQuerySchema } from './common.schemas.js';

export const experienceListSchema = z.object({
  query: paginationQuerySchema.extend({
    category: z.string().trim().optional(),
    difficulty: z.string().trim().optional(),
    duration: z.string().trim().optional(),
    featured: z.coerce.boolean().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
  }),
});

export const experienceCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    slug: z.string().trim().optional(),
    description: z.string().trim().min(20),
    category: z.string().trim().min(2),
    duration: z.string().trim().min(2),
    difficulty: z.string().trim().min(2),
    priceFrom: money,
    image: z.string().trim().url(),
    featured: z.boolean().optional(),
  }),
});

export const experienceUpdateSchema = z.object({
  body: experienceCreateSchema.shape.body.partial(),
  params: z.object({ id: z.string().min(1) }),
});
