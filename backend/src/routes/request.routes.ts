import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/request.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../schemas/common.schemas.js';
import { contactCreateSchema, contactStatusSchema, customTripCreateSchema, customTripStatusSchema } from '../schemas/request.schemas.js';

export const customTripRouter = Router();
customTripRouter.post('/', validate(customTripCreateSchema), controller.createCustomTrip);
customTripRouter.get('/', authenticate, authorize(Role.ADMIN), controller.listCustomTrips);
customTripRouter.get('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.getCustomTrip);
customTripRouter.patch('/:id/status', authenticate, authorize(Role.ADMIN), validate(customTripStatusSchema), controller.updateCustomTripStatus);
customTripRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteCustomTrip);

export const contactRouter = Router();
contactRouter.post('/', validate(contactCreateSchema), controller.createContact);
contactRouter.get('/', authenticate, authorize(Role.ADMIN), controller.listContact);
contactRouter.get('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.getContact);
contactRouter.patch('/:id/status', authenticate, authorize(Role.ADMIN), validate(contactStatusSchema), controller.updateContactStatus);
contactRouter.delete('/:id', authenticate, authorize(Role.ADMIN), validate(idParamSchema), controller.deleteContact);
