import { MessageStatus, RequestStatus, type Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { createPagination, getPagination } from '../utils/pagination.js';

export async function createCustomTrip(userId: string | undefined, data: Omit<Prisma.CustomTripRequestUncheckedCreateInput, 'userId'>) {
  return prisma.customTripRequest.create({ data: { ...data, userId } });
}

export async function listCustomTrips(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const [data, total] = await Promise.all([
    prisma.customTripRequest.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.customTripRequest.count(),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function updateCustomTripStatus(id: string, status: RequestStatus) {
  return prisma.customTripRequest.update({ where: { id }, data: { status } });
}

export async function createContactMessage(data: Prisma.ContactMessageCreateInput) {
  return prisma.contactMessage.create({ data });
}

export async function listContactMessages(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.contactMessage.count(),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function updateContactStatus(id: string, status: MessageStatus) {
  return prisma.contactMessage.update({ where: { id }, data: { status } });
}
