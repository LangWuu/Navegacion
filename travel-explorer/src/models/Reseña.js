import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  
  experienciaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiencia',
    required: true
  },
  
  // Calificaciones múltiples, es decir se divide en varios aspectos , los ven abajito
  calificaciones: {
    general: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    guia: {
      type: Number,
      min: 1,
      max: 5
    },
    ubicacion: {
      type: Number,
      min: 1,
      max: 5
    },
    precio: {
      type: Number,
      min: 1,
      max: 5
    },
    comodidad: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  comentario: {
    type: String,
    maxlength: 1000
  },
  
  fotos: [String],
  
  // Control de edición (48 horas) según vi es un estandar en este tipo de apps
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  
  fechaUltimaEdicion: {
    type: Date,
    default: Date.now
  },
  
  // Verificar si puede editarse
  puedeEditarse: {
    type: Boolean,
    default: true
  },
  
  // Moderación con el fin de mantener la calidad de las reseñas y evitar spam // Agregar un contador en el controlador para verificar si se reporta más de 3 veces
  reportada: {
    type: Boolean,
    default: false
  },
  
  razonReporte: String,
  
  esActiva: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Índices para consultas frecuentes
resenaSchema.index({ experienciaId: 1, fechaCreacion: -1 });
resenaSchema.index({ usuarioId: 1 });

const Resena = mongoose.model('Resena', resenaSchema);

export default Resena;
