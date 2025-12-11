import express from 'express';
import {
    getAllBadges,
    getUserBadges,
    checkAndAwardBadges,
    createBadge
} from '../controllers/badgeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// rutas públicas
router.get('/', getAllBadges); // listar todas las insignias

// rutas protegidas
router.get('/my-badges', protect, getUserBadges); // insignias del usuario
router.post('/check', protect, checkAndAwardBadges); // verificar y asignar nuevas insignias
router.post('/', protect, createBadge); // crear insignia (admin)

export default router;
