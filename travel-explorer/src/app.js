import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Rutas
import authRoutes from './routes/authRoutes.js';
import guiaRoutes from "./routes/guiaRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));

// Rutas base 
app.use('/api/auth', authRoutes);
app.use('/api/guia', guiaRoutes);  

// Manejo de errores
app.use(errorHandler);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`)
);
