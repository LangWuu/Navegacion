// Middleware global de manejo de errores
const errorHandler = (err, req, res, next) => {
    // Para propósitos de debug, registra el error
    console.error("Error capturado por errorHandler:", err);

    const status = err.statusCode || err.status || 500; // Tomar statusCode del error o 500 por defecto
    let message = err.message || 'Error interno del servidor';

    // ----------------------------------------------------
    // Lógica de HEAD: Manejo de error de Validación de Mongoose
    // ----------------------------------------------------
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(e => e.message).join(', ');
        // Usar status 400 para errores de validación
        return res.status(400).json({
            success: false,
            message: message
        });
    }

    // ----------------------------------------------------
    // Lógica combinada: Respuesta final
    // ----------------------------------------------------
    res.status(status).json({
        success: false,
        message: message,
        // Incluir el stack trace solo en desarrollo (buena práctica de seguridad de la versión remota)
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

export default errorHandler;