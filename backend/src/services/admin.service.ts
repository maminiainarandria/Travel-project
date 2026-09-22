import { BookingStatus, MessageStatus } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export async function dashboardStats() {
  const [
    users,
    bookings,
    pendingBookings,
    destinations,
    journeys,
    customTrips,
    unreadMessages,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
    prisma.destination.count(),
    prisma.journey.count(),
    prisma.customTripRequest.count(),
    prisma.contactMessage.count({ where: { status: MessageStatus.UNREAD } }),
  ]);

  return { users, bookings, pendingBookings, destinations, journeys, customTrips, unreadMessages };
}
