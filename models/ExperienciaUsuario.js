import mongoose from 'mongoose';

const experienciaUsuarioSchema = new mongoose.Schema({
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
  
  edicionId: {
    type: String, // Referencia a la edición específica
    required: true
  },
  
  // Estado del historial
  estado: {
    type: String,
    enum: ['completada', 'guardada', 'planeada', 'cancelada'],
    required: true,
    default: 'planeada'
  },
  
  fechaCompletada: Date,
  
  tieneResena: {
    type: Boolean,
    default: false
  },
  
  // Reserva
  fechaReserva: {
    type: Date,
    default: Date.now
  },
  
  numeroPersonas: {
    type: Number,
    min: 1
  },
  
  precioTotal: Number,
  
  confirmada: {
    type: Boolean,
    default: false
  },
  
  notas: String,
  
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

experienciaUsuarioSchema.index({ usuarioId: 1, estado: 1 });
experienciaUsuarioSchema.index({ experienciaId: 1 });

const ExperienciaUsuario = mongoose.model('ExperienciaUsuario', experienciaUsuarioSchema);

export default ExperienciaUsuario;
