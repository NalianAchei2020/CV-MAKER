import express from 'express';
import { saveCV, getUserCVs, deleteCV } from '../controllers/cvController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, saveCV);
router.get('/', protect, getUserCVs);
router.delete('/:id', protect, deleteCV);

export default router;
