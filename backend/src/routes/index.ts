import { Router } from 'express';
import { adminRouter } from './admin.routes.js';
import { articleRouter, galleryRouter, reviewRouter, testimonialRouter } from './content.routes.js';
import { authRouter } from './auth.routes.js';
import { bookingRouter } from './booking.routes.js';
import { contactRouter, customTripRouter } from './request.routes.js';
import { destinationRouter } from './destination.routes.js';
import { experienceRouter } from './experience.routes.js';
import { journeyRouter } from './journey.routes.js';
import { userRouter } from './user.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/destinations', destinationRouter);
apiRouter.use('/experiences', experienceRouter);
apiRouter.use('/journeys', journeyRouter);
apiRouter.use('/bookings', bookingRouter);
apiRouter.use('/custom-trips', customTripRouter);
apiRouter.use('/contact', contactRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/testimonials', testimonialRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/gallery', galleryRouter);
apiRouter.use('/admin', adminRouter);
