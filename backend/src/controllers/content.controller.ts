import { prisma } from '../lib/prisma.js';
import * as contentService from '../services/content.service.js';
import { getBySlug, remove } from '../services/catalog.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMessage, sendSuccess } from '../utils/apiResponse.js';
import { param } from '../utils/request.js';

export const listArticles = asyncHandler(async (req, res) => {
  const result = await contentService.listArticles(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});
export const getArticleBySlug = asyncHandler(async (req, res) => sendSuccess(res, await getBySlug('article', param(req, 'slug'))));
export const createArticle = asyncHandler(async (req, res) => sendSuccess(res, await contentService.createArticle(req.body), 201));
export const updateArticle = asyncHandler(async (req, res) => sendSuccess(res, await contentService.updateArticle(param(req, 'id'), req.body)));
export const deleteArticle = asyncHandler(async (req, res) => { await remove('article', param(req, 'id')); sendMessage(res, 'Article deleted'); });

export const listTestimonials = asyncHandler(async (_req, res) => sendSuccess(res, await contentService.listTestimonials()));
export const createTestimonial = asyncHandler(async (req, res) => sendSuccess(res, await prisma.testimonial.create({ data: req.body }), 201));
export const updateTestimonial = asyncHandler(async (req, res) => sendSuccess(res, await prisma.testimonial.update({ where: { id: param(req, 'id') }, data: req.body })));
export const deleteTestimonial = asyncHandler(async (req, res) => { await prisma.testimonial.delete({ where: { id: param(req, 'id') } }); sendMessage(res, 'Testimonial deleted'); });

export const listGallery = asyncHandler(async (req, res) => {
  const result = await contentService.listGallery(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});
export const createGalleryImage = asyncHandler(async (req, res) => sendSuccess(res, await prisma.galleryImage.create({ data: req.body }), 201));
export const updateGalleryImage = asyncHandler(async (req, res) => sendSuccess(res, await prisma.galleryImage.update({ where: { id: param(req, 'id') }, data: req.body })));
export const deleteGalleryImage = asyncHandler(async (req, res) => { await prisma.galleryImage.delete({ where: { id: param(req, 'id') } }); sendMessage(res, 'Gallery image deleted'); });

export const createReview = asyncHandler(async (req, res) => sendSuccess(res, await contentService.createReview(req.user!.id, req.body), 201));
export const listReviews = asyncHandler(async (req, res) => {
  const result = await contentService.listReviews(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});
export const moderateReview = asyncHandler(async (req, res) => sendSuccess(res, await contentService.moderateReview(param(req, 'id'), req.body.approved)));
