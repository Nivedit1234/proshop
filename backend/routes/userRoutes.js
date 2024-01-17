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
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(registerUser);

router.post('/logout', logoutUser);
router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
