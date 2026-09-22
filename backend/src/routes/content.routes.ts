import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/content.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema, slugParamSchema } from '../schemas/common.schemas.js';
import { articleCreateSchema, articleListSchema, articleUpdateSchema, gallerySchema, reviewModerationSchema, reviewSchema, testimonialSchema } from '../schemas/content.schemas.js';

export const articleRouter = Router();
articleRouter.get('/', validate(articleListSchema), controller.listArticles);
articleRouter.get('/:slug', validate(slugParamSchema), controller.getArticleBySlug);
articleRouter.post('/', authenticate, authorize(Role.ADMIN), validate(articleCreateSchema), controller.createArticle);
articleRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(articleUpdateSchema), controller.updateArticle);
articleRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteArticle);

export const testimonialRouter = Router();
testimonialRouter.get('/', controller.listTestimonials);
testimonialRouter.post('/', authenticate, authorize(Role.ADMIN), validate(testimonialSchema), controller.createTestimonial);
testimonialRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(testimonialSchema.extend({ params: idParamSchema.shape.params })), controller.updateTestimonial);
testimonialRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteTestimonial);

export const galleryRouter = Router();
galleryRouter.get('/', controller.listGallery);
galleryRouter.post('/', authenticate, authorize(Role.ADMIN), validate(gallerySchema), controller.createGalleryImage);
galleryRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(gallerySchema.extend({ params: idParamSchema.shape.params })), controller.updateGalleryImage);
galleryRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteGalleryImage);

export const reviewRouter = Router();
reviewRouter.post('/', authenticate, validate(reviewSchema), controller.createReview);
reviewRouter.get('/', controller.listReviews);
reviewRouter.patch('/:id/moderation', authenticate, authorize(Role.ADMIN), validate(reviewModerationSchema), controller.moderateReview);
