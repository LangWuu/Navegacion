import express from 'express';
import {
    createReview,
    getReviewsByExperience,
    updateReview,
    deleteReview,
    reportReview
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// rutas públicas
router.get('/experience/:experienceId', getReviewsByExperience); // listar reseñas de una experiencia

// rutas protegidas
router.post('/', protect, createReview); // crear reseña
router.put('/:id', protect, updateReview); // editar reseña propia
router.delete('/:id', protect, deleteReview); // eliminar reseña propia
router.post('/:id/report', protect, reportReview); // reportar reseña

export default router;
