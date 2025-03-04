import express from 'express';
import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  updateTemplateLive,
} from '../controllers/templateController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', protect, adminOnly, createTemplate);
router.put('/:id', protect, adminOnly, updateTemplate);
router.patch('/:id/live', protect, adminOnly, updateTemplateLive);
router.delete('/:id', protect, adminOnly, deleteTemplate);

export default router;
