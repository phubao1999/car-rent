import { IUser } from './../interface/user.interface';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'anonymous'], // Define allowed roles
    default: 'anonymous',
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
