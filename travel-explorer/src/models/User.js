import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  rol: {
    type: String,
    enum: ['turista', 'guia'],
    required: [true, 'El rol es obligatorio'],
    default: 'turista'
  },
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
  idiomas: [String],
  añosExperiencia: Number,
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


userSchema.pre('save', async function () {
  // Si la contraseña no fue modificada, no hacer nada
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Error al encriptar la contraseña: ' + error.message);
  }
});


userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;