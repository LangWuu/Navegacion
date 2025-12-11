import express from 'express';
import {
    getAllRoutes,
    getRouteById,
    createRoute,
    generateRouteByTheme,
    getUserRoutes
} from '../controllers/routeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// rutas públicas
router.get('/', getAllRoutes); // listar rutas públicas
router.get('/generate/:theme', generateRouteByTheme); // generar ruta por tema
router.get('/:id', getRouteById); // detalle de ruta

// rutas protegidas
router.post('/', protect, createRoute); // crear ruta personalizada
router.get('/user/my-routes', protect, getUserRoutes); // rutas del usuario (debe ir antes de /:id)

export default router;
