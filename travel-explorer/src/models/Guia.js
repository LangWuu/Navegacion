import mongoose from "mongoose";

const guiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  telefono: { type: String, required: true, trim: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, required: true },
  descripcion: { type: String, required: true, trim: true },

  password: { type: String, required: true },

  cvUrl: { type: String, required: true },

  createdAt: { type: Date, default: Date.now }
});

const Guia = mongoose.model("Guia", guiaSchema);
export default Guia;
