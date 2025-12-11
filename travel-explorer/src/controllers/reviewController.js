import Resena from '../models/Reseña.js';
import Experiencia from '../models/Experiencia.js';

// crear reseña con fotos
export const createReview = async (req, res) => {
    try {
        const {
            experienciaId,
            calificaciones,
            comentario,
            fotos // array de URLs (las fotos ya deberían estar subidas)
        } = req.body;

        // verificamos que la experiencia exista
        const experiencia = await Experiencia.findById(experienciaId);
        if (!experiencia) {
            return res.status(404).json({
                success: false,
                message: 'Experiencia no encontrada'
            });
        }

        // verificamos que el usuario no haya reseñado ya esta experiencia
        const existeResena = await Resena.findOne({
            usuarioId: req.user.id,
            experienciaId: experienciaId
        });

        if (existeResena) {
            return res.status(400).json({
                success: false,
                message: 'Ya has reseñado esta experiencia'
            });
        }

        // creamos la reseña
        const resena = await Resena.create({
            usuarioId: req.user.id,
            experienciaId,
            calificaciones,
            comentario,
            fotos: fotos || []
        });

        // actualizamos el conteo de reseñas y la calificación promedio de la experiencia
        const todasLasResenas = await Resena.find({ experienciaId, esActiva: true });
        const cantidadResenas = todasLasResenas.length;
        const sumaCalificaciones = todasLasResenas.reduce((sum, r) => sum + r.calificaciones.general, 0);
        const promedioCalificacion = sumaCalificaciones / cantidadResenas;

        experiencia.cantidadResenas = cantidadResenas;
        experiencia.calificacionPromedio = Math.round(promedioCalificacion * 10) / 10; // redondeamos a 1 decimal
        await experiencia.save();

        // poblamos la reseña antes de devolverla
        await resena.populate('usuarioId', 'nombre apellido fotoPerfil');

        res.status(201).json({
            success: true,
            message: 'Reseña creada exitosamente',
            data: resena
        });

    } catch (error) {
        console.error('Error creando reseña:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: errors[0]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear reseña'
        });
    }
};


// obtener reseñas de una experiencia
export const getReviewsByExperience = async (req, res) => {
    try {
        const { experienceId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const skip = (Number(page) - 1) * Number(limit);

        const resenas = await Resena.find({
            experienciaId: experienceId,
            esActiva: true
        })
            .populate('usuarioId', 'nombre apellido fotoPerfil')
            .sort({ fechaCreacion: -1 })
            .limit(Number(limit))
            .skip(skip);

        const total = await Resena.countDocuments({
            experienciaId: experienceId,
            esActiva: true
        });

        res.json({
            success: true,
            data: resenas,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                limit: Number(limit)
            }
        });

    } catch (error) {
        console.error('Error obteniendo reseñas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener reseñas'
        });
    }
};


// editar reseña (solo dentro de 48 horas)
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { calificaciones, comentario, fotos } = req.body;

        const resena = await Resena.findById(id);

        if (!resena) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        // verificamos que el usuario sea el dueño de la reseña
        if (resena.usuarioId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar esta reseña'
            });
        }

        // verificamos que no hayan pasado más de 48 horas
        const horasTranscurridas = (Date.now() - resena.fechaCreacion) / (1000 * 60 * 60);
        if (horasTranscurridas > 48) {
            resena.puedeEditarse = false;
            await resena.save();
            return res.status(403).json({
                success: false,
                message: 'Ya no puedes editar esta reseña (límite de 48 horas)'
            });
        }

        // actualizamos los campos
        if (calificaciones) resena.calificaciones = calificaciones;
        if (comentario !== undefined) resena.comentario = comentario;
        if (fotos) resena.fotos = fotos;
        resena.fechaUltimaEdicion = Date.now();

        await resena.save();

        // recalculamos el promedio de la experiencia
        const todasLasResenas = await Resena.find({
            experienciaId: resena.experienciaId,
            esActiva: true
        });
        const sumaCalificaciones = todasLasResenas.reduce((sum, r) => sum + r.calificaciones.general, 0);
        const promedioCalificacion = sumaCalificaciones / todasLasResenas.length;

        await Experiencia.findByIdAndUpdate(resena.experienciaId, {
            calificacionPromedio: Math.round(promedioCalificacion * 10) / 10
        });

        await resena.populate('usuarioId', 'nombre apellido fotoPerfil');

        res.json({
            success: true,
            message: 'Reseña actualizada exitosamente',
            data: resena
        });

    } catch (error) {
        console.error('Error actualizando reseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar reseña'
        });
    }
};


// eliminar reseña
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const resena = await Resena.findById(id);

        if (!resena) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        // verificamos que el usuario sea el dueño
        if (resena.usuarioId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar esta reseña'
            });
        }

        // soft delete cambiamos esActiva a false
        resena.esActiva = false;
        await resena.save();

        // recalculamos el promedio de la experiencia
        const todasLasResenas = await Resena.find({
            experienciaId: resena.experienciaId,
            esActiva: true
        });

        if (todasLasResenas.length > 0) {
            const sumaCalificaciones = todasLasResenas.reduce((sum, r) => sum + r.calificaciones.general, 0);
            const promedioCalificacion = sumaCalificaciones / todasLasResenas.length;

            await Experiencia.findByIdAndUpdate(resena.experienciaId, {
                calificacionPromedio: Math.round(promedioCalificacion * 10) / 10,
                cantidadResenas: todasLasResenas.length
            });
        } else {
            // si no quedan reseñas, volvemos a calificación por defecto
            await Experiencia.findByIdAndUpdate(resena.experienciaId, {
                calificacionPromedio: 5,
                cantidadResenas: 0
            });
        }

        res.json({
            success: true,
            message: 'Reseña eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error eliminando reseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar reseña'
        });
    }
};


// reportar reseña
export const reportReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { razon } = req.body;

        const resena = await Resena.findById(id);

        if (!resena) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        resena.reportada = true;
        resena.razonReporte = razon || 'Sin especificar';
        await resena.save();

        res.json({
            success: true,
            message: 'Reseña reportada exitosamente. Será revisada por nuestro equipo'
        });

    } catch (error) {
        console.error('Error reportando reseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error al reportar reseña'
        });
    }
};
