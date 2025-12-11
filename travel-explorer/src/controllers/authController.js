import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import { sanitizeUser } from '../utils/sanitizeUser.js';

// creamos el token con json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// registro
export const register = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, fechaNacimiento, genero, password, confirmPassword } = req.body;

    if (!nombre || !apellido || !email || !telefono || !fechaNacimiento || !genero || !password || !confirmPassword) {
      return next(new AppError('Todos los campos son obligatorios', 400));
    }
    if (password !== confirmPassword) {
      return next(new AppError('Las contraseñas no coinciden', 400));
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('El usuario ya existe, cambie el email', 400));
    }
    const user = await User.create({
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimiento,
      genero,
      password,
      rol: 'turista'
    });
    return res.status(201).json({
      ...sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return next(new AppError(errors[0], 400));
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return next(new AppError(`El ${field} ya está registrado`, 400));
    }
    next(error);
  }
};

// logeo/  pasamos correo y contraseña
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email y contraseña son obligatorios', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Usuario no encontrado', 400));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new AppError('Contraseña incorrecta', 400));
    }
    res.json({
      ...sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};