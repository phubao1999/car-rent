import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'anonymous';
  matchPassword(enteredPassword: string): Promise<boolean>;
}
