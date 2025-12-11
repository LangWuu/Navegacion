import express from 'express';
import {
    getProfile,
    updateProfile,
    updatePreferences,
    getUserHistory
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// todas las rutas están protegidas, requieren autenticación
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/preferences', protect, updatePreferences);
router.get('/history', protect, getUserHistory);

export default router;
