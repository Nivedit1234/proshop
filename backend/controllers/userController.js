import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { errorHandler } from '../middleware/errorHandler.js';

//@desc Auth user & get token
//@route GET /api/user/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //We can check the password here also with bcrypt compare method
  //But Proper way to do this is by writing a checkPassword method in userSchema.
  //Now that we have defined the matchPassword method in our userSchema we can call that method onto our user object above (const user = await User.findOne({ email });
  //)

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
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
