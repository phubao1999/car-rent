import mongoose from 'mongoose';
import { envConfig } from '../config';
import { initDBCollections } from '../utils/db.util';
import { MESSAGES, MESSAGES_ERROR_VALIDATED } from '../constant';
import { logger } from '../utils/logger.util';

export const connectDB = async () => {
  try {
    const mongoURI = envConfig.mongoURI;
    if (!mongoURI) {
      throw new Error(MESSAGES_ERROR_VALIDATED.DB_CONNECTION);
    }
    await mongoose.connect(mongoURI, {});
    console.log(MESSAGES.DB_CONNECTED);
    initDBCollections();
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
