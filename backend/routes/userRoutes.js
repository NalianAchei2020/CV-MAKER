import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, getAllUsers); // ✅ Read all users
router.post('/users', protect, adminOnly, createUser); // ✅ Create user
router.put('/users/:id', protect, adminOnly, updateUser); // ✅ Update user
router.delete('/users/:id', protect, adminOnly, deleteUser); // ✅ Delete user

export default router;
