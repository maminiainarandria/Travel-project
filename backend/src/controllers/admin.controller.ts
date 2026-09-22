import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { dashboardStats } from '../services/admin.service.js';

export const dashboard = asyncHandler(async (_req, res) => {
  sendSuccess(res, await dashboardStats());
});
