import { z } from 'zod';
import { money, paginationQuerySchema } from './common.schemas.js';

const itinerarySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
  location: z.string().trim().min(2),
});

export const journeyListSchema = z.object({
  query: paginationQuerySchema.extend({
    featured: z.coerce.boolean().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
  }),
});

export const journeyCreateSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2),
    slug: z.string().trim().optional(),
    description: z.string().trim().min(20),
    shortDescription: z.string().trim().min(8),
    duration: z.number().int().positive(),
    priceFrom: money,
    featured: z.boolean().optional(),
    image: z.string().trim().url(),
    itineraries: z.array(itinerarySchema).min(1),
  }),
});

export const journeyUpdateSchema = z.object({
  body: journeyCreateSchema.shape.body.partial(),
  params: z.object({ id: z.string().min(1) }),
});
