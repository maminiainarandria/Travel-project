import { z } from 'zod';

export const idParamSchema = z.object({ params: z.object({ id: z.string().min(1) }) });
export const slugParamSchema = z.object({ params: z.object({ slug: z.string().min(1) }) });

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const optionalDate = z.coerce.date().optional();
export const requiredDate = z.coerce.date();
export const money = z.coerce.number().nonnegative();
export const stringArray = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
}, z.array(z.string().min(1)));
