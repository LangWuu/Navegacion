import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  phone: {
    type: String,
    required: [true, 'El celular es obligatorio'],
    match: [/^\+?\d{7,15}$/, 'Número de celular inválido']
  },
  birthDate: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  gender: {
    type: String,
    enum: ['masculino', 'femenino', 'other'],
    required: [true, 'El género es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  preferences: {
    type: [String],
    default: []
  }
}, { timestamps: true });

// se hashea la contraseña antes de guardar
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error("Error al encriptar la contraseña: " + error.message);
  }
});



// comparamos la contraseña
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
