import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// conectamos a mongo
connectDB();

const app = express();

// los middlewares
app.use(cors());
app.use(express.json()); //trecibimos json
app.use(morgan('dev'));

// ruta establecida
app.use('/api/auth', authRoutes);

// error  simple
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

// servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
