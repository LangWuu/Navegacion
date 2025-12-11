<<<<<<< HEAD
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
=======
import jwt from "jsonwebtoken";

// aca verificamos que el jwt sea valido
export const authMiddleware = (req, res, next) => {
  try {
    //Obtener token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. El token es requerido."
      });
    }

    const token = authHeader.split(" ")[1];

    //  Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Guardar información del usuario en la request
    req.user = {
      id: decoded.id
    };

    next();
  } catch (err) {
    console.error("Error en authMiddleware:", err.message);

    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado."
    });
  }
>>>>>>> 617477b059f446bcd76f994fc23ce8aebc9e1241
};
