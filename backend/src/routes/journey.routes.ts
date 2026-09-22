import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/catalog.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema, slugParamSchema } from '../schemas/common.schemas.js';
import { journeyCreateSchema, journeyListSchema, journeyUpdateSchema } from '../schemas/journey.schemas.js';

export const journeyRouter = Router();

journeyRouter.get('/', validate(journeyListSchema), controller.listJourneys);
journeyRouter.get('/slug/:slug', validate(slugParamSchema), controller.getJourneyBySlug);
journeyRouter.get('/:id', validate(idParamSchema), controller.getJourney);
journeyRouter.post('/', authenticate, authorize(Role.ADMIN), validate(journeyCreateSchema), controller.createJourney);
journeyRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(journeyUpdateSchema), controller.updateJourney);
journeyRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteJourney);
