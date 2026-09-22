import { Role } from '@prisma/client';
import { z } from 'zod';

export const userListSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().trim().optional(),
    role: z.nativeEnum(Role).optional(),
  }),
});

export const userUpdateSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    firstName: z.string().trim().min(2).optional(),
    lastName: z.string().trim().min(2).optional(),
    email: z.string().trim().email().toLowerCase().optional(),
    phone: z.string().trim().nullable().optional(),
    role: z.nativeEnum(Role).optional(),
  }),
});
