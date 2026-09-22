import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.js';

export function validate(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });

    if (!result.success) {
      return next(formatZodError(result.error));
    }

    req.body = result.data.body ?? req.body;
    req.query = result.data.query ?? req.query;
    req.params = result.data.params ?? req.params;
    return next();
  };
}

function formatZodError(error: ZodError) {
  return new ValidationError('Validation failed', error.flatten());
}
