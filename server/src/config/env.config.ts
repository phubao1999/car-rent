import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoURI: string;
  adminEmail: string;
  adminPassword: string;
  jwtSecret: string;
}

export const envConfig: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@gmail.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  jwtSecret: process.env.JWT_SECRET || 'secret'
};
