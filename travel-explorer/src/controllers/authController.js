import User from '../models/User.js';
import jwt from 'jsonwebtoken';


// creamos el token con json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


// registro
export const register = async (req, res) => {
  console.log("REQ BODY:", req.body);


  //  NOMBRES CORRECTOS que coinciden con el modelo User.js
  const { nombre, apellido, email, telefono, fechaNacimiento, genero, password, confirmPassword } = req.body;


  // Validación en el backend también
  if (!nombre || !apellido || !email || !telefono || !fechaNacimiento || !genero || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }


  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }


  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'El usuario ya existe, cambie el email' });


    //  Usar los nombres correctos del modelo
    const user = await User.create({
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimiento,
      genero,
      password,
      rol: 'turista' // rol por defecto
    });


    return res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono,
      fechaNacimiento: user.fechaNacimiento,
      genero: user.genero,
      token: generateToken(user._id)
    });


  } catch (error) {
    console.error("ERROR REGISTER:", error);
    if (error.name === "ValidationError") {
      // se convierte los errores en un solo string 
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors[0] });
    }

    // Error de email duplicado
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `El ${field} ya está registrado` });
    }


    // Otros errores
    return res.status(500).json({ message: "Error registrando usuario" });
  }
};




// logeo/  pasamos correo y contraseña
export const login = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password)
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });


  try {
    //  Importante: select('+password') porque password tiene select: false en el schema
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });


    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });


    //  Devolver TODOS los datos del usuario
    res.json({
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono,
      fechaNacimiento: user.fechaNacimiento,
      genero: user.genero,
      token: generateToken(user._id)
    });


  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};