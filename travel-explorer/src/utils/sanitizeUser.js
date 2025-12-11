// Helper para sanitizar la salida del usuario y nunca devolver datos sensibles
export function sanitizeUser(user) {
  return {
    _id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    telefono: user.telefono,
    fechaNacimiento: user.fechaNacimiento,
    genero: user.genero,
    // Agrega aquí solo los campos que quieras exponer
  };
}
