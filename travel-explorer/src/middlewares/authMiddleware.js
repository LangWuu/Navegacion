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
};
