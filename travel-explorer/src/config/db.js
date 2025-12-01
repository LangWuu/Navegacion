import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB conectado correctamente');
  } catch (error) {
    console.error(' Error conectando a MongoDB:', error.message);
    process.exit(1); // paramos la app si falla la conexión
  }
};

export default connectDB;
