import mongoose from 'mongoose';
import { envConfig } from '../config';
import { initDBCollections } from '../utils/db.util';

export const connectDB = async () => {
  try {
    const mongoURI = envConfig.mongoURI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI, {});
    console.log('MongoDB connected successfully');
    initDBCollections();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
