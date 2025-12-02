import mongoose from 'mongoose';

const insigniaUsuarioSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  
  insigniaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insignia',
    required: true
  },
  
  fechaObtenida: {
    type: Date,
    default: Date.now
  },
  
  nivel: {
    type: Number,
    default: 1
  },
  
  esPublica: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

insigniaUsuarioSchema.index({ usuarioId: 1 });
insigniaUsuarioSchema.index({ usuarioId: 1, insigniaId: 1 }, { unique: true });

const InsigniaUsuario = mongoose.model('InsigniaUsuario', insigniaUsuarioSchema);

export default InsigniaUsuario;
