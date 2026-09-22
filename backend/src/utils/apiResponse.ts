import type { Response } from 'express';

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, pagination?: Pagination) {
  return res.status(statusCode).json({ success: true, data, ...(pagination ? { pagination } : {}) });
}

export function sendMessage(res: Response, message: string, statusCode = 200) {
  return res.status(statusCode).json({ success: true, message });
}
