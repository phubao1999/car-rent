import { envConfig } from '../config';
import { User } from '../models';

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
