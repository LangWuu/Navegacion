import Ruta from '../models/Ruta.js';
import Experiencia from '../models/Experiencia.js';

// listar rutas públicas y del usuario
export const getAllRoutes = async (req, res) => {
    try {
        const { tema, page = 1, limit = 10 } = req.query;

        // construimos el filtro solo rutas públicas o oficiales
        const filter = {
            $or: [
                { esPublica: true },
                { esOficial: true }
            ]
        };

        if (tema) {
            filter.tema = tema;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const rutas = await Ruta.find(filter)
            .populate('creadaPor', 'nombre apellido')
            .populate('experiencias.experienciaId', 'titulo categorias fotos ubicacion')
            .limit(Number(limit))
            .skip(skip)
            .sort({ fechaCreacion: -1 });

        const total = await Ruta.countDocuments(filter);

        res.json({
            success: true,
            data: rutas,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total,
                limit: Number(limit)
            }
        });

    } catch (error) {
        console.error('Error listando rutas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al listar rutas'
        });
    }
};


// obtener detalle de una ruta
export const getRouteById = async (req, res) => {
    try {
        const { id } = req.params;

        const ruta = await Ruta.findById(id)
            .populate('creadaPor', 'nombre apellido email fotoPerfil')
            .populate('experiencias.experienciaId'); // poblamos todas las experiencias

        if (!ruta) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }

        res.json({
            success: true,
            data: ruta
        });

    } catch (error) {
        console.error('Error obteniendo ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener ruta'
        });
    }
};


// crear ruta personalizada
export const createRoute = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            tema,
            experiencias, // array de {experienciaId, orden, duracionEstimada, notas}
            dificultad,
            esPublica
        } = req.body;

        // calculamos el tiempo total estimado
        const tiempoTotal = experiencias.reduce((total, exp) => total + (exp.duracionEstimada || 0), 0);

        const ruta = await Ruta.create({
            nombre,
            descripcion,
            tema,
            experiencias,
            tiempoTotalEstimado: tiempoTotal,
            dificultad: dificultad || 'media',
            creadaPor: req.user.id,
            tipoCreadaPor: req.user.rol === 'guia' ? 'guia' : 'turista',
            esOficial: false,
            esPublica: esPublica || false
        });

        // poblamos la ruta creada antes de devolverla
        await ruta.populate('experiencias.experienciaId');

        res.status(201).json({
            success: true,
            message: 'Ruta creada exitosamente',
            data: ruta
        });

    } catch (error) {
        console.error('Error creando ruta:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: errors[0]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear ruta'
        });
    }
};


// generar ruta automáticamente según tema
export const generateRouteByTheme = async (req, res) => {
    try {
        const { theme } = req.params;
        const { ciudad, maxExperiencias = 5 } = req.query;

        // buscamos experiencias de ese tema
        const filter = {
            categorias: theme,
            isActiva: true
        };

        if (ciudad) {
            filter['ubicacion.ciudad'] = { $regex: ciudad, $options: 'i' };
        }

        const experiencias = await Experiencia.find(filter)
            .sort({ calificacionPromedio: -1 }) // ordenamos por mejor calificación
            .limit(Number(maxExperiencias));

        if (experiencias.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No se encontraron experiencias de ${theme}`
            });
        }

        // construimos el array de experiencias para la ruta
        const experienciasRuta = experiencias.map((exp, index) => ({
            experienciaId: exp._id,
            orden: index + 1,
            duracionEstimada: 120, // estimamos 2 horas por experiencia
            notas: `Experiencia ${index + 1} de la ruta de ${theme}`
        }));

        const tiempoTotal = experienciasRuta.length * 120;

        // creamos una ruta sugerida (no la guardamos, solo la devolvemos)
        const rutaSugerida = {
            nombre: `Ruta de ${theme}${ciudad ? ` en ${ciudad}` : ''}`,
            descripcion: `Ruta temática de ${theme} con las mejores experiencias seleccionadas`,
            tema: theme,
            experiencias: experienciasRuta,
            tiempoTotalEstimado: tiempoTotal,
            dificultad: 'media',
            esOficial: false,
            esPublica: false,
            // Incluimos las experiencias completas en el response
            experienciasCompletas: experiencias
        };

        res.json({
            success: true,
            message: 'Ruta generada exitosamente. Puedes guardarla usando POST /api/routes',
            data: rutaSugerida
        });

    } catch (error) {
        console.error('Error generando ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al generar ruta'
        });
    }
};


// obtener rutas del usuario autenticado
export const getUserRoutes = async (req, res) => {
    try {
        const rutas = await Ruta.find({ creadaPor: req.user.id })
            .populate('experiencias.experienciaId', 'titulo fotos')
            .sort({ fechaCreacion: -1 });

        res.json({
            success: true,
            data: rutas
        });

    } catch (error) {
        console.error('Error obteniendo rutas del usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener rutas'
        });
    }
};
