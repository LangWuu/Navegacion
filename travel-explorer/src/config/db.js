import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    console.log('🔗 Conectando a MongoDB...');
    
    if (!uri) {
      throw new Error('MONGO_URI no está definida en .env');
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error conectando MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
