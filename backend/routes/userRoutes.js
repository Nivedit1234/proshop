import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
} from '../controllers/userController.js';
import Product from '../models/productModel.js';
const router = express.Router();

router.route('/').get(getUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser);

export default router;
