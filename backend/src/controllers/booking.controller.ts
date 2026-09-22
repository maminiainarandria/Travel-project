import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMessage, sendSuccess } from '../utils/apiResponse.js';
import * as bookingService from '../services/booking.service.js';
import { param } from '../utils/request.js';

export const createBooking = asyncHandler(async (req, res) => {
  sendSuccess(res, await bookingService.createBooking(req.user!.id, req.body), 201);
});

export const listBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.listBookings(req.user!, req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getBooking = asyncHandler(async (req, res) => sendSuccess(res, await bookingService.getBooking(req.user!, param(req, 'id'))));
export const updateBookingStatus = asyncHandler(async (req, res) => sendSuccess(res, await bookingService.updateBookingStatus(param(req, 'id'), req.body.status)));
export const deleteBooking = asyncHandler(async (req, res) => { await bookingService.deleteBooking(param(req, 'id')); sendMessage(res, 'Booking deleted'); });
