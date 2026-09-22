import { Role } from '@prisma/client';
import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema } from '../schemas/common.schemas.js';
import { userListSchema, userUpdateSchema } from '../schemas/user.schemas.js';

export const userRouter = Router();

userRouter.use(authenticate, authorize(Role.ADMIN));
userRouter.get('/', validate(userListSchema), controller.listUsers);
userRouter.get('/:id', validate(idParamSchema), controller.getUser);
userRouter.put('/:id', validate(userUpdateSchema), controller.updateUser);
userRouter.delete('/:id', validate(idParamSchema), controller.deleteUser);
