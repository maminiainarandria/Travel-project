import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { createPagination, getPagination } from '../utils/pagination.js';
import { slugify } from '../utils/slug.js';

export async function listArticles(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.ArticleWhereInput = {
    ...(typeof query.published === 'boolean' ? { published: query.published } : {}),
    ...(typeof query.search === 'string' ? { OR: ['title', 'excerpt', 'content'].map((field) => ({ [field]: { contains: query.search, mode: 'insensitive' } })) } : {}),
  };
  const [data, total] = await Promise.all([
    prisma.article.findMany({ where, skip, take: limit, orderBy: { publishedAt: 'desc' } }),
    prisma.article.count({ where }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function createArticle(data: Prisma.ArticleCreateInput) {
  return prisma.article.create({ data: { ...data, slug: data.slug || slugify(data.title), publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt } });
}

export async function updateArticle(id: string, data: Prisma.ArticleUpdateInput) {
  return prisma.article.update({ where: { id }, data: { ...data, ...(typeof data.title === 'string' && !data.slug ? { slug: slugify(data.title) } : {}) } });
}

export async function listTestimonials() {
  return prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
}

export async function listGallery(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const [data, total] = await Promise.all([
    prisma.galleryImage.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.galleryImage.count(),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function createReview(userId: string, data: Prisma.ReviewUncheckedCreateInput) {
  return prisma.review.create({ data: { ...data, userId } });
}

export async function listReviews(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const [data, total] = await Promise.all([
    prisma.review.findMany({ where: { approved: true }, include: { user: true, journey: true, experience: true }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.review.count({ where: { approved: true } }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function moderateReview(id: string, approved: boolean) {
  return prisma.review.update({ where: { id }, data: { approved } });
}
