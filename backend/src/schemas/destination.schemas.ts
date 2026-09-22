import { z } from 'zod';
import { paginationQuerySchema } from './common.schemas.js';

export const destinationListSchema = z.object({
  query: paginationQuerySchema.extend({
    region: z.string().trim().optional(),
    featured: z.coerce.boolean().optional(),
  }),
});

export const destinationCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    slug: z.string().trim().optional(),
    description: z.string().trim().min(20),
    region: z.string().trim().min(2),
    shortDescription: z.string().trim().min(8),
    featured: z.boolean().optional(),
    image: z.string().trim().url(),
  }),
});

export const destinationUpdateSchema = z.object({
  body: destinationCreateSchema.shape.body.partial(),
  params: z.object({ id: z.string().min(1) }),
});
