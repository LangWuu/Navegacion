import mongoose from 'mongoose';

const insigniaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la insignia es obligatorio'],
    trim: true
  },
  
  descripcion: {
    type: String,
    required: true
  },
  
  iconoUrl: {
    type: String,
    required: true
  },
  
  tipo: {
    type: String,
    enum: ['experiencias', 'categoria', 'rutas', 'resenas', 'logro_especial'],
    required: true
  },
  
  criterio: {
    type: String,
    required: true
  },
  
  // Valores que definen cuándo se gana
  condicion: {
    tipo: String,
    valor: Number // ej: 5 experiencias, 10 reseñas
  },
  
  nivel: {
    type: Number,
    default: 1
  },
  
  esActiva: {
    type: Boolean,
    default: true
  },
  
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Insignia = mongoose.model('Insignia', insigniaSchema);

export default Insignia;
