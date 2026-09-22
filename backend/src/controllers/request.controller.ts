import { prisma } from '../lib/prisma.js';
import * as requestService from '../services/request.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMessage, sendSuccess } from '../utils/apiResponse.js';
import { param } from '../utils/request.js';

export const createCustomTrip = asyncHandler(async (req, res) => {
  sendSuccess(res, await requestService.createCustomTrip(req.user?.id, req.body), 201);
});

export const listCustomTrips = asyncHandler(async (req, res) => {
  const result = await requestService.listCustomTrips(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getCustomTrip = asyncHandler(async (req, res) => sendSuccess(res, await prisma.customTripRequest.findUniqueOrThrow({ where: { id: param(req, 'id') } })));
export const updateCustomTripStatus = asyncHandler(async (req, res) => sendSuccess(res, await requestService.updateCustomTripStatus(param(req, 'id'), req.body.status)));
export const deleteCustomTrip = asyncHandler(async (req, res) => { await prisma.customTripRequest.delete({ where: { id: param(req, 'id') } }); sendMessage(res, 'Custom trip request deleted'); });

export const createContact = asyncHandler(async (req, res) => {
  sendSuccess(res, await requestService.createContactMessage(req.body), 201);
});

export const listContact = asyncHandler(async (req, res) => {
  const result = await requestService.listContactMessages(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getContact = asyncHandler(async (req, res) => sendSuccess(res, await prisma.contactMessage.findUniqueOrThrow({ where: { id: param(req, 'id') } })));
export const updateContactStatus = asyncHandler(async (req, res) => sendSuccess(res, await requestService.updateContactStatus(param(req, 'id'), req.body.status)));
export const deleteContact = asyncHandler(async (req, res) => { await prisma.contactMessage.delete({ where: { id: param(req, 'id') } }); sendMessage(res, 'Contact message deleted'); });
