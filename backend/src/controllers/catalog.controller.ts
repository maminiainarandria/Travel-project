import type { Prisma } from '@prisma/client';
import * as catalog from '../services/catalog.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMessage, sendSuccess } from '../utils/apiResponse.js';
import { param } from '../utils/request.js';

export const listDestinations = asyncHandler(async (req, res) => {
  const result = await catalog.listDestinations(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getDestination = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getById('destination', param(req, 'id'))));
export const getDestinationBySlug = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getBySlug('destination', param(req, 'slug'))));
export const createDestination = asyncHandler(async (req, res) => sendSuccess(res, await catalog.createDestination(req.body), 201));
export const updateDestination = asyncHandler(async (req, res) => sendSuccess(res, await catalog.updateDestination(param(req, 'id'), req.body)));
export const deleteDestination = asyncHandler(async (req, res) => { await catalog.remove('destination', param(req, 'id')); sendMessage(res, 'Destination deleted'); });

export const listExperiences = asyncHandler(async (req, res) => {
  const result = await catalog.listExperiences(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getExperience = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getById('experience', param(req, 'id'))));
export const getExperienceBySlug = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getBySlug('experience', param(req, 'slug'))));
export const createExperience = asyncHandler(async (req, res) => sendSuccess(res, await catalog.createExperience(req.body), 201));
export const updateExperience = asyncHandler(async (req, res) => sendSuccess(res, await catalog.updateExperience(param(req, 'id'), req.body)));
export const deleteExperience = asyncHandler(async (req, res) => { await catalog.remove('experience', param(req, 'id')); sendMessage(res, 'Experience deleted'); });

export const listJourneys = asyncHandler(async (req, res) => {
  const result = await catalog.listJourneys(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

function prepareJourneyPayload(body: Record<string, unknown>) {
  const itineraries = body.itineraries as { day: number; title: string; description: string; location: string }[] | undefined;
  const data = { ...body };
  delete data.itineraries;
  return { ...data, ...(itineraries ? { itineraries: { create: itineraries } } : {}) };
}

export const getJourney = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getById('journey', param(req, 'id'), { itineraries: true })));
export const getJourneyBySlug = asyncHandler(async (req, res) => sendSuccess(res, await catalog.getBySlug('journey', param(req, 'slug'), { itineraries: { orderBy: { day: 'asc' } } })));
export const createJourney = asyncHandler(async (req, res) => sendSuccess(res, await catalog.createJourney(prepareJourneyPayload(req.body) as Prisma.JourneyCreateInput), 201));
export const updateJourney = asyncHandler(async (req, res) => sendSuccess(res, await catalog.updateJourney(param(req, 'id'), prepareJourneyPayload(req.body) as Prisma.JourneyUpdateInput)));
export const deleteJourney = asyncHandler(async (req, res) => { await catalog.remove('journey', param(req, 'id')); sendMessage(res, 'Journey deleted'); });
