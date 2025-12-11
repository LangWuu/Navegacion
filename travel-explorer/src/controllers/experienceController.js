import Experiencia from '../models/Experiencia.js';
import AppError from '../utils/AppError.js';

// listar experiencias con filtros y paginación
export const getAllExperiences = async (req, res, next) => {
    try {
        // sacamos los parámetros de query
        const {
            categoria,
            ciudad,
            precioMin,
            precioMax,
            page = 1,
            limit = 10,
            sortBy = 'fechaCreacion',
            order = 'desc'
        } = req.query;

        // construimos el filtro
        const filter = { isActiva: true };

        if (categoria) {
            filter.categorias = categoria; // busca si el array incluye esa categoría
        }

        if (ciudad) {
            filter['ubicacion.ciudad'] = { $regex: ciudad, $options: 'i' }; // búsqueda insensible a mayúsculas
        }

        // filtro de precio (buscamos en las ediciones)
        if (precioMin || precioMax) {
            const precioFilter = {};
            if (precioMin) precioFilter.$gte = Number(precioMin);
            if (precioMax) precioFilter.$lte = Number(precioMax);
            filter['ediciones.precio'] = precioFilter;
        }

        // calculamos el skip para la paginación
        const skip = (Number(page) - 1) * Number(limit);

        // ordenamiento
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortOptions = { [sortBy]: sortOrder };

        // ejecutamos las queries
        const experiencias = await Experiencia.find(filter)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip(skip)
            .populate('guias', 'nombre apellido calificacionPromedio fotoPerfil');

        const total = await Experiencia.countDocuments(filter);

        res.json({
            success: true,
            data: experiencias,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                limit: Number(limit)
            }
        });
    } catch (error) {
        next(error);
    }
};


// obtener detalle de una experiencia
export const getExperienceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const experiencia = await Experiencia.findById(id)
            .populate('guias', 'nombre apellido email telefono idiomas añosExperiencia descripcionPerfil fotoPerfil calificacionPromedio');

        if (!experiencia) {
            return next(new AppError('Experiencia no encontrada', 404));
        }

        res.json({
            success: true,
            data: experiencia
        });
    } catch (error) {
        next(error);
    }
};


// búsqueda de experiencias por texto
export const searchExperiences = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        if (!q) {
            return next(new AppError('Debes proporcionar un término de búsqueda', 400));
        }

        // buscamos en título y descripción
        const filter = {
            isActiva: true,
            $or: [
                { titulo: { $regex: q, $options: 'i' } },
                { descripcion: { $regex: q, $options: 'i' } }
            ]
        };

        const skip = (Number(page) - 1) * Number(limit);

        const experiencias = await Experiencia.find(filter)
            .limit(Number(limit))
            .skip(skip)
            .populate('guias', 'nombre apellido fotoPerfil');

        const total = await Experiencia.countDocuments(filter);

        res.json({
            success: true,
            data: experiencias,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                limit: Number(limit)
            }
        });
    } catch (error) {
        next(error);
    }
};


// buscar experiencias cercanas a unas coordenadas (geoespacial)
export const getExperiencesByLocation = async (req, res, next) => {
    try {
        const { lat, lng, maxDistance = 10000 } = req.query; // maxDistance en metros (default 10km)

        if (!lat || !lng) {
            return next(new AppError('Debes proporcionar latitud y longitud', 400));
        }

        // búsqueda geoespacial
        const experiencias = await Experiencia.find({
            isActiva: true,
            'ubicacion.coordenadas': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [Number(lng), Number(lat)] // [longitud, latitud]
                    },
                    $maxDistance: Number(maxDistance)
                }
            }
        })
            .limit(20)
            .populate('guias', 'nombre apellido fotoPerfil');

        res.json({
            success: true,
            data: experiencias
        });
    } catch (error) {
        next(error);
    }
};


// crear experiencia (solo para guías)
export const createExperience = async (req, res, next) => {
    try {
        const {
            titulo,
            descripcion,
            categorias,
            ubicacion,
            ediciones,
            capacidadMaxima,
            fotos
        } = req.body;

        // verificamos que el usuario sea guía
        if (req.user.rol !== 'guia') {
            return next(new AppError('Solo los guías pueden crear experiencias', 403));
        }

        const experiencia = await Experiencia.create({
            titulo,
            descripcion,
            categorias,
            ubicacion,
            guias: [req.user.id], // el guía que crea es el primer guía
            ediciones,
            capacidadMaxima,
            fotos: fotos || []
        });

        res.status(201).json({
            success: true,
            message: 'Experiencia creada exitosamente',
            data: experiencia
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return next(new AppError(errors[0], 400));
        }
        next(error);
    }
};
