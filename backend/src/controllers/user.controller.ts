import * as userService from '../services/user.service.js';
import { sendMessage, sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { param } from '../utils/request.js';

export const listUsers = asyncHandler(async (req, res) => {
  const result = await userService.listUsers(req.query);
  sendSuccess(res, result.data, 200, result.pagination);
});

export const getUser = asyncHandler(async (req, res) => {
  sendSuccess(res, await userService.getUser(param(req, 'id')));
});

export const updateUser = asyncHandler(async (req, res) => {
  sendSuccess(res, await userService.updateUser(param(req, 'id'), req.body));
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(param(req, 'id'), req.user!.id);
  sendMessage(res, 'User deleted');
});
