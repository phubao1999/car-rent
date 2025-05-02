import mongoose from 'mongoose';
import { envConfig } from '../config';
import { Car, Season, User } from '../models';

export const connectDBForUT = async () => {
  try {
    const mongoURI = envConfig.mongoURI;
    await mongoose.connect(mongoURI, {});
    console.log('MongoDB connected successfully');
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

export const initDBCollections = async () => {
  await initAdmin();
  await initializeSeasons();
  await initializeCars();
};

const initAdmin = async () => {
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
};

const initializeSeasons = async () => {
  const existingSeasons = await Season.find();

  if (existingSeasons.length === 0) {
    console.log(
      'No seasons found in the database. Initializing default seasons...',
    );

    const seasons = [
      {
        name: 'Peak Season',
        code: 'peakSeasonPrice',
        periods: [
          {
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-09-15'),
          },
        ],
      },
      {
        name: 'Mid Season',
        code: 'midSeasonPrice',
        periods: [
          {
            startDate: new Date('2025-03-01'),
            endDate: new Date('2025-06-01'),
          },
          {
            startDate: new Date('2025-09-15'),
            endDate: new Date('2025-10-31'),
          },
        ],
      },
      {
        name: 'Off Season',
        code: 'offSeasonPrice',
        periods: [
          {
            startDate: new Date('2025-11-01'),
            endDate: new Date('2026-03-01'),
          },
        ],
      },
    ];

    await Season.insertMany(seasons);
    console.log('Default seasons have been initialized.');
  } else {
    console.log('Seasons already exist in the database.');
  }
};

const initializeCars = async () => {
  const existingCars = await Car.find();

  if (existingCars.length === 0) {
    console.log('No cars found in the database. Initializing default cars...');

    const cars = [
      {
        brand: 'Toyota',
        model: 'Yaris',
        stock: 3,
        peakSeasonPrice: 98.43,
        midSeasonPrice: 76.89,
        offSeasonPrice: 53.65,
      },
      {
        brand: 'Seat',
        model: 'Ibiza',
        stock: 5,
        peakSeasonPrice: 85.12,
        midSeasonPrice: 65.73,
        offSeasonPrice: 46.85,
      },
      {
        brand: 'Nissan',
        model: 'Qashqai',
        stock: 2,
        peakSeasonPrice: 101.46,
        midSeasonPrice: 82.94,
        offSeasonPrice: 59.87,
      },
      {
        brand: 'Jaguar',
        model: 'e-pace',
        stock: 1,
        peakSeasonPrice: 120.54,
        midSeasonPrice: 91.35,
        offSeasonPrice: 70.27,
      },
      {
        brand: 'Mercedes',
        model: 'Vito',
        stock: 2,
        peakSeasonPrice: 109.16,
        midSeasonPrice: 89.64,
        offSeasonPrice: 64.97,
      },
    ];

    await Car.insertMany(cars);
    console.log('Default cars have been initialized.');
  } else {
    console.log('Cars already exist in the database.');
  }
};
