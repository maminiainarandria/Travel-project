import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { createPagination, getPagination } from '../utils/pagination.js';
import { ForbiddenError } from '../utils/errors.js';
import { sanitizeUser } from '../utils/sanitize.js';

export async function listUsers(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.UserWhereInput = {
    ...(typeof query.role === 'string' ? { role: query.role as Prisma.EnumRoleFilter['equals'] } : {}),
    ...(typeof query.search === 'string'
      ? {
          OR: [
            { firstName: { contains: query.search, mode: 'insensitive' } },
            { lastName: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.user.count({ where }),
  ]);

  return { data: users.map(sanitizeUser), pagination: createPagination(page, limit, total) };
}

export async function getUser(id: string) {
  return sanitizeUser(await prisma.user.findUniqueOrThrow({ where: { id } }));
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return sanitizeUser(await prisma.user.update({ where: { id }, data }));
}

export async function deleteUser(id: string, currentUserId: string) {
  if (id === currentUserId) {
    throw new ForbiddenError('Admins cannot delete their own account');
  }
  await prisma.user.delete({ where: { id } });
}
