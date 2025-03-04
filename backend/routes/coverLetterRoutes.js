import express from 'express';
import {
  getAllCoverLetters,
  getCoverLetterById,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from '../controllers/coverLetterController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/cover-letters', getAllCoverLetters);
router.get('/cover-letters/:id', getCoverLetterById);
router.post('/cover-letters', protect, adminOnly, createCoverLetter);
router.put('/cover-letters/:id', protect, adminOnly, updateCoverLetter);
router.delete('/cover-letters/:id', protect, adminOnly, deleteCoverLetter);

export default router;
