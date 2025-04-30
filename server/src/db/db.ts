import mongoose from 'mongoose';
import { envConfig } from '../config';
import { User } from '../models';

export const connectDB = async () => {
  try {
    const mongoURI = envConfig.mongoURI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI, {});

    console.log('MongoDB connected successfully');
    // Seed admin user
    const adminEmail = envConfig.adminEmail;
    const adminPassword = envConfig.adminPassword;

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin', // Add a role field to distinguish admin users
      });
      console.log(`Admin user created with email: ${adminEmail}`);
    } else {
      console.log('Admin user already exists');
    }
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
