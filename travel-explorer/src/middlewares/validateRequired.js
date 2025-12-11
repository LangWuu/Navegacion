// Middleware para validar campos requeridos en req.body
const validateRequired = (fields) => (req, res, next) => {
  for (let field of fields) {
    if (!req.body[field]) {
      return res.status(400).json({ success: false, message: `El campo ${field} es obligatorio` });
    }
  }
  next();
};

export default validateRequired;
