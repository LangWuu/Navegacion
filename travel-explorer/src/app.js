import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';

dotenv.config();

// necesitamos __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// conectamos a mongo
connectDB();

const app = express();

// los middlewares
app.use(cors());
app.use(express.json()); //trecibimos json
app.use(morgan('dev'));

// servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// rutas establecidas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/badges', badgeRoutes);

// error  simple
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

// servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
