import { BookingStatus, MessageStatus, RequestStatus } from '@prisma/client';
import { z } from 'zod';
import { money, optionalDate, requiredDate, stringArray } from './common.schemas.js';

export const bookingCreateSchema = z.object({
  body: z.object({
    journeyId: z.string().min(1),
    numberOfTravelers: z.number().int().positive(),
    startDate: requiredDate,
    endDate: requiredDate,
    specialRequests: z.string().trim().optional(),
  }),
});

export const bookingStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ status: z.nativeEnum(BookingStatus) }),
});

export const customTripCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string().trim().optional(),
    startDate: optionalDate,
    endDate: optionalDate,
    travelers: z.number().int().positive(),
    budget: money.optional(),
    interests: stringArray,
    destinations: stringArray,
    accommodation: z.string().trim().optional(),
    message: z.string().trim().min(10),
  }),
});

export const customTripStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ status: z.nativeEnum(RequestStatus) }),
});

export const contactCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string().trim().optional(),
    subject: z.string().trim().min(3),
    message: z.string().trim().min(10),
  }),
});

export const contactStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ status: z.nativeEnum(MessageStatus) }),
});
