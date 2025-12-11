import Insignia from '../models/Insignia.js';
import InsigniaUsuario from '../models/InsigniaUsuario.js';
import Resena from '../models/Reseña.js';
import ExperienciaUsuario from '../models/ExperienciaUsuario.js';

// obtener todas las insignias disponibles
export const getAllBadges = async (req, res) => {
    try {
        const insignias = await Insignia.find({ esActiva: true })
            .sort({ nivel: 1, fechaCreacion: 1 });

        res.json({
            success: true,
            data: insignias
        });

    } catch (error) {
        console.error('Error obteniendo insignias:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener insignias'
        });
    }
};


// obtener insignias del usuario
export const getUserBadges = async (req, res) => {
    try {
        const insigniasUsuario = await InsigniaUsuario.find({ usuarioId: req.user.id })
            .populate('insigniaId')
            .sort({ fechaObtenida: -1 });

        res.json({
            success: true,
            data: insigniasUsuario
        });

    } catch (error) {
        console.error('Error obteniendo insignias del usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener insignias del usuario'
        });
    }
};


// verificar y asignar insignias automáticamente
export const checkAndAwardBadges = async (req, res) => {
    try {
        const userId = req.user.id;

        // contamos las experiencias realizadas por el usuario
        const experienciasRealizadas = await ExperienciaUsuario.countDocuments({
            usuarioId: userId,
            completada: true
        });

        // contamos las reseñas del usuario
        const resenasCreadas = await Resena.countDocuments({
            usuarioId: userId,
            esActiva: true
        });

        // obtenemos todas las insignias activas
        const todasInsignias = await Insignia.find({ esActiva: true });

        // obtenemos las insignias que ya tiene el usuario
        const insigniasExistentes = await InsigniaUsuario.find({ usuarioId: userId });
        const insigniasIds = insigniasExistentes.map(i => i.insigniaId.toString());

        const insigniasNuevas = [];

        // recorremos las insignias para ver cuáles aplican
        for (const insignia of todasInsignias) {
            // si ya tiene esta insignia, la saltamos
            if (insigniasIds.includes(insignia._id.toString())) {
                continue;
            }

            let cumpleCondicion = false;

            // verificamos según el tipo de insignia
            switch (insignia.tipo) {
                case 'experiencias':
                    if (experienciasRealizadas >= insignia.condicion.valor) {
                        cumpleCondicion = true;
                    }
                    break;

                case 'resenas':
                    if (resenasCreadas >= insignia.condicion.valor) {
                        cumpleCondicion = true;
                    }
                    break;

                // puedes agregar más tipos según necesites
                default:
                    break;
            }

            // si cumple la condición, le asignamos la insignia
            if (cumpleCondicion) {
                const nuevaInsignia = await InsigniaUsuario.create({
                    usuarioId: userId,
                    insigniaId: insignia._id,
                    progreso: insignia.condicion.valor
                });

                await nuevaInsignia.populate('insigniaId');
                insigniasNuevas.push(nuevaInsignia);
            }
        }

        if (insigniasNuevas.length > 0) {
            res.json({
                success: true,
                message: `¡Felicitaciones! Has obtenido ${insigniasNuevas.length} nueva(s) insignia(s)`,
                data: insigniasNuevas
            });
        } else {
            res.json({
                success: true,
                message: 'No hay nuevas insignias por el momento. ¡Sigue explorando!',
                data: []
            });
        }

    } catch (error) {
        console.error('Error verificando insignias:', error);
        res.status(500).json({
            success: false,
            message: 'Error al verificar insignias'
        });
    }
};


// crear insignia (solo admin - para simplificar lo dejamos sin protección extra por ahora)
export const createBadge = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            iconoUrl,
            tipo,
            criterio,
            condicion,
            nivel
        } = req.body;

        const insignia = await Insignia.create({
            nombre,
            descripcion,
            iconoUrl,
            tipo,
            criterio,
            condicion,
            nivel: nivel || 1
        });

        res.status(201).json({
            success: true,
            message: 'Insignia creada exitosamente',
            data: insignia
        });

    } catch (error) {
        console.error('Error creando insignia:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: errors[0]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear insignia'
        });
    }
};
