import Guia from "../models/Guia.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarGuia = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimiento,
      genero,
      descripcion,
      experiencia,
      password
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "El archivo Pdf es obligatorio" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    const guia = new Guia({
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimiento,
      genero,
      descripcion,
      experiencia,
      password: hash,
      cvUrl: `/uploads/${req.file.filename}`
    });

    await guia.save();

    res.status(201).json({ message: "Guía registrado exitosamente" });

  } catch (error) {
    console.error("Error en registrarGuia:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// LOGIN
export const loginGuia = async (req, res) => {
  try {
    const { email, password } = req.body;

    const guia = await Guia.findOne({ email });
    if (!guia) return res.status(404).json({ message: "Guía no encontrado" });

    const valid = await bcrypt.compare(password, guia.password);
    if (!valid)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: guia._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token
    });

  } catch (error) {
    console.error("Error en loginGuia:", error);
    res.status(500).json({ message: "Error interno" });
  }
};
