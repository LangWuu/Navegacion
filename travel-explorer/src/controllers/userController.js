import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { sanitizeUser } from '../utils/sanitizeUser.js';

// obtener perfil del usuario autenticado
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new AppError('Usuario no encontrado', 404));
        }
        res.json({ success: true, data: sanitizeUser(user) });
    } catch (error) {
        next(error);
    }
};


// actualizar información básica del perfil
export const updateProfile = async (req, res, next) => {
    try {
        const {
            nombre,
            apellido,
            telefono,
            fechaNacimiento,
            genero,
            descripcionPerfil,
            idiomas,
            restriccionesSalud
        } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new AppError('Usuario no encontrado', 404));
        }

        if (nombre) user.nombre = nombre;
        if (apellido) user.apellido = apellido;
        if (telefono) user.telefono = telefono;
        if (fechaNacimiento) user.fechaNacimiento = fechaNacimiento;
        if (genero) user.genero = genero;
        if (descripcionPerfil !== undefined) user.descripcionPerfil = descripcionPerfil;
        if (idiomas) user.idiomas = idiomas;
        if (restriccionesSalud) user.restriccionesSalud = restriccionesSalud;

        await user.save();
        res.json({
            success: true,
            message: 'Perfil actualizado correctamente',
            data: sanitizeUser(user)
        });
    } catch (error) {
        next(error);
    }
};


// actualizar preferencias de viaje
export const updatePreferences = async (req, res, next) => {
    try {
        const {
            categoriasPreferidas,
            estiloViaje,
            rangoPresupuesto,
            disponibilidad
        } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new AppError('Usuario no encontrado', 404));
        }

        if (categoriasPreferidas) {
            user.preferenciasViaje.categoriasPreferidas = categoriasPreferidas;
        }
        if (estiloViaje) {
            user.preferenciasViaje.estiloViaje = estiloViaje;
        }
        if (rangoPresupuesto) {
            user.preferenciasViaje.rangoPresupuesto = rangoPresupuesto;
        }
        if (disponibilidad) {
            user.preferenciasViaje.disponibilidad = disponibilidad;
        }

        await user.save();
        res.json({
            success: true,
            message: 'Preferencias actualizadas correctamente',
            data: { preferenciasViaje: user.preferenciasViaje }
        });
    } catch (error) {
        next(error);
    }
};


// obtener historial de experiencias del usuario
export const getUserHistory = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('experienciasOfrecidas');
        if (!user) {
            return next(new AppError('Usuario no encontrado', 404));
        }
        res.json({
            success: true,
            data: { experiencias: user.experienciasOfrecidas || [] }
        });
    } catch (error) {
        next(error);
    }
};
