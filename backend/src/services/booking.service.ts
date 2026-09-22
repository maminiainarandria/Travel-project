import { BookingStatus, Role, type Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { createPagination, getPagination } from '../utils/pagination.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../utils/errors.js';

type Actor = { id: string; role: Role };

type BookingInput = {
  journeyId: string;
  numberOfTravelers: number;
  startDate: Date;
  endDate: Date;
  specialRequests?: string;
};

export async function createBooking(userId: string, input: BookingInput) {
  if (input.endDate <= input.startDate) {
    throw new ValidationError('End date must be after start date');
  }

  const journey = await prisma.journey.findUnique({ where: { id: input.journeyId } });
  if (!journey) {
    throw new NotFoundError('Journey not found');
  }

  return prisma.booking.create({
    data: {
      userId,
      journeyId: input.journeyId,
      numberOfTravelers: input.numberOfTravelers,
      startDate: input.startDate,
      endDate: input.endDate,
      specialRequests: input.specialRequests,
      totalPrice: Number(journey.priceFrom) * input.numberOfTravelers,
    },
    include: { journey: true },
  });
}

export async function listBookings(actor: Actor, query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const where: Prisma.BookingWhereInput = actor.role === Role.ADMIN ? {} : { userId: actor.id };
  const [data, total] = await Promise.all([
    prisma.booking.findMany({ where, include: { journey: true, user: true }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.booking.count({ where }),
  ]);
  return { data, pagination: createPagination(page, limit, total) };
}

export async function getBooking(actor: Actor, id: string) {
  const booking = await prisma.booking.findUnique({ where: { id }, include: { journey: true, user: true } });
  if (!booking) throw new NotFoundError('Booking not found');
  if (actor.role !== Role.ADMIN && booking.userId !== actor.id) throw new ForbiddenError();
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return prisma.booking.update({ where: { id }, data: { status } });
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({ where: { id } });
}
