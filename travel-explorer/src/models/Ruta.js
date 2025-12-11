import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la ruta es obligatorio'],
    trim: true
  },
  
  descripcion: {
    type: String,
    required: true
  },
  
  tema: {
    type: String,
    enum: ['gastronomía', 'cultura', 'aventura', 'arte', 'naturaleza', 'historia', 'deportes', 'mixto'],
    required: true
  },
  
  // Experiencias en la ruta (con orden)
  experiencias: [
    {
      experienciaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiencia',
        required: true
      },
      orden: {
        type: Number,
        required: true
      },
      duracionEstimada: {
        type: Number, // minutos
        required: true
      },
      notas: String
    }
  ],
  
  tiempoTotalEstimado: {
    type: Number, // minutos
    required: true
  },
  
  dificultad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  
  // Creador de la ruta
  creadaPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  
  tipoCreadaPor: {
    type: String,
    enum: ['sistema', 'guia', 'turista'],
    default: 'turista'
  },
  
  // Visibilidad y compartir
  esOficial: {
    type: Boolean,
    default: false
  },
  
  esPublica: {
    type: Boolean,
    default: false
  },
  
  linkCompartir: String,
  
  comparidaCon: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  ],
  
  calificacionPromedio: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
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

rutaSchema.index({ tema: 1, esPublica: 1 });
rutaSchema.index({ creadaPor: 1 });

const Ruta = mongoose.model('Ruta', rutaSchema);

export default Ruta;
