import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors.js';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = error.code === 'P2025' ? 404 : 400;
    const message = error.code === 'P2002' ? 'A unique constraint failed' : 'Database request failed';
    return res.status(statusCode).json({ success: false, message });
  }

  if (env.NODE_ENV !== 'test') {
    console.error(error);
  }

  return res.status(500).json({ success: false, message: 'Internal server error' });
}
