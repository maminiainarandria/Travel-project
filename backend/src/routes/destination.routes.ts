import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/catalog.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema, slugParamSchema } from '../schemas/common.schemas.js';
import { destinationCreateSchema, destinationListSchema, destinationUpdateSchema } from '../schemas/destination.schemas.js';

export const destinationRouter = Router();

destinationRouter.get('/', validate(destinationListSchema), controller.listDestinations);
destinationRouter.get('/slug/:slug', validate(slugParamSchema), controller.getDestinationBySlug);
destinationRouter.get('/:id', validate(idParamSchema), controller.getDestination);
destinationRouter.post('/', authenticate, authorize(Role.ADMIN), validate(destinationCreateSchema), controller.createDestination);
destinationRouter.put('/:id', authenticate, authorize(Role.ADMIN), validate(destinationUpdateSchema), controller.updateDestination);
destinationRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteDestination);
