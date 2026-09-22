import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/catalog.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema, slugParamSchema } from '../schemas/common.schemas.js';
import { experienceCreateSchema, experienceListSchema, experienceUpdateSchema } from '../schemas/experience.schemas.js';

export const experienceRouter = Router();

experienceRouter.get('/', validate(experienceListSchema), controller.listExperiences);
experienceRouter.get('/slug/:slug', validate(slugParamSchema), controller.getExperienceBySlug);
experienceRouter.get('/:id', validate(idParamSchema), controller.getExperience);
experienceRouter.post('/', authenticate, authorize(Role.ADMIN), validate(experienceCreateSchema), controller.createExperience);
experienceRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(experienceUpdateSchema), controller.updateExperience);
experienceRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteExperience);
