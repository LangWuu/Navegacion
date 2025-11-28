import mongoose from 'mongoose';

const experienciaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  
  // Múltiples categorías
  categorias: {
    type: [String],
    enum: ['gastronomía', 'cultura', 'aventura', 'arte', 'naturaleza', 'historia', 'deportes', 'otros'],
    required: [true, 'Al menos una categoría es obligatoria']
  },
  
  // Ubicación con coordenadas para Google Maps
  ubicacion: {
    ciudad: {
      type: String,
      required: true
    },
    pais: {
      type: String,
      required: true
    },
    direccion: String,
    coordenadas: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitud, latitud]
        required: true
      }
    },
    placeid: String // ID de Google Maps
  },
  
  // Guías que ofrecen esta experiencia
  guias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  ],
  
  // Ediciones (verano, invierno, etc)
  ediciones: [
    {
      nombre: String,
      fechaInicio: Date,
      fechaFin: Date,
      precio: {
        type: Number,
        required: true
      },
      horario: String,
      isActiva: {
        type: Boolean,
        default: true
      }
    }
  ],
  
  // Capacidad y logística
  capacidadMaxima: {
    type: Number,
    required: true,
    min: 1
  },
  
  reservasActuales: {
    type: Number,
    default: 0
  },
  
  // Calificación
  calificacionPromedio: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  
  cantidadResenas: {
    type: Number,
    default: 0
  },
  
  // Fotos
  fotos: [String],
  
  isActiva: {
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

// Índice geoespacial para búsquedas por ubicación
experienciaSchema.index({ 'ubicacion.coordenadas': '2dsphere' });
experienciaSchema.index({ categorias: 1 });
experienciaSchema.index({ isActiva: 1 });

const Experiencia = mongoose.model('Experiencia', experienciaSchema);

export default Experiencia;
