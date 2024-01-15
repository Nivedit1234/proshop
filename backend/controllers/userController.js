import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { errorHandler } from '../middleware/errorHandler.js';

//@desc Auth user & get token
//@route GET /api/user/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  res.send('auth user');
});

//@desc Register user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

//@desc logout User and clear cookie (stored as http only in server)
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout User');
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send('User Profile');
});

//@desc Update user profile
//@route PUT /api/users/profile/updateUserProfile
//@access Private
//no need to pass the id in the route because a user can only update his profile which will be present in the token in encoded form

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('Update User Profile');
});

//@desc Get users all the users
//@route GET /api/users/
//@access Private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users by admin only');
});

//@desc Delete users
//@route DELETE /api/users/:id
//@access Private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user by admin only');
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/admin

const getUsersById = asyncHandler(async (req, res) => {
  res.send('Get User By Id by admin only');
});

//@desc Update User by admin
//@route PUT /api/users/:id
//@access Private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send(' Update User Profile by admin only');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
};
