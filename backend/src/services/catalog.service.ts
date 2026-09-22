import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { createPagination, getPagination } from '../utils/pagination.js';
import { slugify } from '../utils/slug.js';
import { NotFoundError } from '../utils/errors.js';

type Query = Record<string, unknown>;
type Entity = 'destination' | 'experience' | 'journey' | 'article' | 'testimonial' | 'galleryImage' | 'review' | 'contactMessage' | 'customTripRequest' | 'booking' | 'user';

function searchable(search: unknown, fields: string[]) {
  if (!search || typeof search !== 'string') return undefined;
  return { OR: fields.map((field) => ({ [field]: { contains: search, mode: 'insensitive' } })) };
}

function orderBy(query: Query, fallback = 'createdAt') {
  const sortBy = typeof query.sortBy === 'string' ? query.sortBy : fallback;
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
  return { [sortBy]: sortOrder };
}

export async function listDestinations(query: Query) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.DestinationWhereInput = {
    ...(searchable(query.search, ['name', 'description', 'region']) as Prisma.DestinationWhereInput),
    ...(typeof query.region === 'string' ? { region: { contains: query.region, mode: 'insensitive' } } : {}),
    ...(typeof query.featured === 'boolean' ? { featured: query.featured } : {}),
  };
  const [data, total] = await Promise.all([
    prisma.destination.findMany({ where, skip, take: limit, orderBy: orderBy(query, 'name') }),
    prisma.destination.count({ where }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function listExperiences(query: Query) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.ExperienceWhereInput = {
    ...(searchable(query.search, ['name', 'description', 'category']) as Prisma.ExperienceWhereInput),
    ...(typeof query.category === 'string' ? { category: { contains: query.category, mode: 'insensitive' } } : {}),
    ...(typeof query.difficulty === 'string' ? { difficulty: { contains: query.difficulty, mode: 'insensitive' } } : {}),
    ...(typeof query.duration === 'string' ? { duration: { contains: query.duration, mode: 'insensitive' } } : {}),
    ...(typeof query.featured === 'boolean' ? { featured: query.featured } : {}),
    ...priceFilter(query),
  };
  const [data, total] = await Promise.all([
    prisma.experience.findMany({ where, skip, take: limit, orderBy: orderBy(query, 'name') }),
    prisma.experience.count({ where }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function listJourneys(query: Query) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.JourneyWhereInput = {
    ...(searchable(query.search, ['title', 'description', 'shortDescription']) as Prisma.JourneyWhereInput),
    ...(typeof query.featured === 'boolean' ? { featured: query.featured } : {}),
    ...priceFilter(query),
  };
  const [data, total] = await Promise.all([
    prisma.journey.findMany({ where, include: { itineraries: { orderBy: { day: 'asc' } } }, skip, take: limit, orderBy: orderBy(query, 'createdAt') }),
    prisma.journey.count({ where }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function getById(entity: Entity, id: string, include?: Record<string, unknown>) {
  const delegate = prisma[entity] as {
    findUnique(args: Record<string, unknown>): Promise<unknown | null>;
  };
  const data = await delegate.findUnique({ where: { id }, ...(include ? { include } : {}) });
  if (!data) throw new NotFoundError(`${entity} not found`);
  return data;
}

export async function getBySlug(entity: 'destination' | 'experience' | 'journey' | 'article', slug: string, include?: Record<string, unknown>) {
  const delegate = prisma[entity] as {
    findUnique(args: Record<string, unknown>): Promise<unknown | null>;
  };
  const data = await delegate.findUnique({ where: { slug }, ...(include ? { include } : {}) });
  if (!data) throw new NotFoundError(`${entity} not found`);
  return data;
}

export async function createDestination(data: Prisma.DestinationCreateInput) {
  return prisma.destination.create({ data: { ...data, slug: data.slug || slugify(data.name) } });
}

export async function updateDestination(id: string, data: Prisma.DestinationUpdateInput) {
  return prisma.destination.update({ where: { id }, data: { ...data, ...(typeof data.name === 'string' && !data.slug ? { slug: slugify(data.name) } : {}) } });
}

export async function createExperience(data: Prisma.ExperienceCreateInput) {
  return prisma.experience.create({ data: { ...data, slug: data.slug || slugify(data.name) } });
}

export async function updateExperience(id: string, data: Prisma.ExperienceUpdateInput) {
  return prisma.experience.update({ where: { id }, data: { ...data, ...(typeof data.name === 'string' && !data.slug ? { slug: slugify(data.name) } : {}) } });
}

export async function createJourney(data: Prisma.JourneyCreateInput) {
  return prisma.journey.create({ data: { ...data, slug: data.slug || slugify(data.title) }, include: { itineraries: { orderBy: { day: 'asc' } } } });
}

export async function updateJourney(id: string, data: Prisma.JourneyUpdateInput) {
  const itineraries = data.itineraries;
  const journeyData = { ...data };
  delete journeyData.itineraries;
  return prisma.$transaction(async (tx) => {
    if (itineraries) {
      await tx.itinerary.deleteMany({ where: { journeyId: id } });
    }
    return tx.journey.update({
      where: { id },
      data: {
        ...journeyData,
        ...(typeof data.title === 'string' && !data.slug ? { slug: slugify(data.title) } : {}),
        ...(itineraries ? { itineraries } : {}),
      },
      include: { itineraries: { orderBy: { day: 'asc' } } },
    });
  });
}

export async function remove(entity: Exclude<Entity, 'user'>, id: string) {
  const delegate = prisma[entity] as {
    delete(args: Record<string, unknown>): Promise<unknown>;
  };
  return delegate.delete({ where: { id } });
}

function priceFilter(query: Query) {
  const min = typeof query.minPrice === 'number' ? query.minPrice : undefined;
  const max = typeof query.maxPrice === 'number' ? query.maxPrice : undefined;
  return min !== undefined || max !== undefined ? { priceFrom: { ...(min !== undefined ? { gte: min } : {}), ...(max !== undefined ? { lte: max } : {}) } } : {};
}
