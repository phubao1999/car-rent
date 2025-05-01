import { envConfig } from '../config';
import { Season, User } from '../models';

export const initAdmin = async () => {
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

export const initializeSeasons = async () => {
  const existingSeasons = await Season.find();

  if (existingSeasons.length === 0) {
    console.log(
      'No seasons found in the database. Initializing default seasons...',
    );

    const seasons = [
      {
        name: 'Peak Season',
        periods: [
          {
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-09-15'),
          },
        ],
      },
      {
        name: 'Mid Season',
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
