
 // Captura errores por producción y responde con un json.
 
export const errorHandler = (err, req, res, next) => {
  console.error(" Error capturado por errorMiddleware:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Error interno del servidor",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};
export default errorHandler;