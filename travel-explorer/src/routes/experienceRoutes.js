import express from 'express';
import {
    getAllExperiences,
    getExperienceById,
    searchExperiences,
    getExperiencesByLocation,
    createExperience
} from '../controllers/experienceController.js';
import { protect, isGuia } from '../middlewares/authMiddleware.js';

const router = express.Router();

// rutas públicas
router.get('/', getAllExperiences); // listar con filtros
router.get('/search', searchExperiences); // búsqueda por texto
router.get('/nearby', getExperiencesByLocation); // búsqueda geoespacial
router.get('/:id', getExperienceById); // detalle de una experiencia

// rutas protegidas
router.post('/', protect, isGuia, createExperience); // crear (solo guías)

export default router;
