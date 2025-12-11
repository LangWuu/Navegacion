import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// middleware para proteger rutas
export const protect = async (req, res, next) => {
    let token;

    // verificamos si hay token en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // sacamos el token del header "Bearer TOKEN"
            token = req.headers.authorization.split(' ')[1];

            // verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // buscamos el usuario y lo agregamos a req
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado, usuario no encontrado'
                });
            }

            next(); // continuamos a la siguiente función
        } catch (error) {
            console.error('Error en autenticación:', error);
            return res.status(401).json({
                success: false,
                message: 'No autorizado, token inválido'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado, no hay token'
        });
    }
};


// middleware opcional para verificar si el usuario es guía
export const isGuia = (req, res, next) => {
    if (req.user && req.user.rol === 'guia') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Acceso denegado, solo para guías'
        });
    }
};
