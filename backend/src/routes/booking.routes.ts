import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/booking.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../schemas/common.schemas.js';
import { bookingCreateSchema, bookingStatusSchema } from '../schemas/request.schemas.js';

export const bookingRouter = Router();

bookingRouter.use(authenticate);
bookingRouter.post('/', validate(bookingCreateSchema), controller.createBooking);
bookingRouter.get('/', controller.listBookings);
bookingRouter.get('/:id', validate(idParamSchema), controller.getBooking);
bookingRouter.patch('/:id/status', authorize(Role.ADMIN), validate(bookingStatusSchema), controller.updateBookingStatus);
bookingRouter.delete('/:id', authorize(Role.ADMIN), validate(idParamSchema), controller.deleteBooking);
