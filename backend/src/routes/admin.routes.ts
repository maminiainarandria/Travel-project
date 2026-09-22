import { Role } from '@prisma/client';
import { Router } from 'express';
import { dashboard } from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

export const adminRouter = Router();

adminRouter.use(authenticate, authorize(Role.ADMIN));
adminRouter.get('/dashboard', dashboard);
