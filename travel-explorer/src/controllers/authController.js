import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// creamos el token con json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// registro
export const register = async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, phone, birthDate, gender, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !birthDate || !gender || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'El usuario ya existe, cambie el email' });

    const user = await User.create({ name, email, phone, birthDate, gender, password });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("ERROR REGISTER:", error);
    if (error.name === "ValidationError") {
      // se convierte los errores en un solo string 
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors[0] });
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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

   res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  token: generateToken(user._id)
});

  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};
