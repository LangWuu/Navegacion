import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  // Información básica
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    unique: true,
    match: [/^\+?\d{7,15}$/, 'Número de teléfono inválido']
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  genero: {
    type: String,
    enum: ['masculino', 'femenino', 'otro'],
    required: [true, 'El género es obligatorio']
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  
  // Rol: turista o guía
  rol: {
    type: String,
    enum: ['turista', 'guia'],
    required: [true, 'El rol es obligatorio'],
    default: 'turista'
  },
  
  // Campos para turistas
  restriccionesSalud: {
    type: [String],
    default: []
  },
  preferenciasViaje: {
    categoriasPreferidas: [String],
    estiloViaje: {
      type: String,
      enum: ['mochilero', 'familiar', 'lujo', 'aventura', 'cultural'],
      default: 'aventura'
    },
    rangoPresupuesto: {
      minimo: Number,
      maximo: Number
    },
    disponibilidad: {
      type: String,
      enum: ['fin de semana', 'una semana', 'dos semanas', 'flexible'],
      default: 'flexible'
    }
  },
  
  // Campos para guías
  idiomas: [String],
  aniosExperiencia: Number,
  descripcionPerfil: String,
  fotoPerfil: String,
  calificacionPromedio: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  experienciasOfrecidas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experiencia'
    }
  ],
  
  // Estado del usuario
  esActivo: {
    type: Boolean,
    default: true
  },
  
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    throw new Error('Error al encriptar la contraseña: ' + error.message);
  }
});

// Método para comparar contraseña
usuarioSchema.methods.compararContrasena = async function(contrasenIngresada) {
  return await bcrypt.compare(contrasenIngresada, this.contrasena);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
