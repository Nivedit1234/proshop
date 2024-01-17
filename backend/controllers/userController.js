import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { errorHandler } from '../middleware/errorHandler.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
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
    generateToken(res, user._id);

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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error({ message: 'User Already Exists' });
  }

  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(password, salt);
  //return hashedPassword;
  //const hashedPassword = await User.hashPassword(password);
  //if using above method to save password type {password:hashedPassword} below
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

//@desc logout User and clear cookie (stored as http only in server)
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: 'Logged Out Successfully' });
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    res.json({ message: 'User Not Found' });
  }
});

//@desc Update user profile
//@route PUT /api/users/profile/updateUserProfile
//@access Private
//no need to pass the id in the route because a user can only update his profile which will be present in the token in encoded form

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
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
