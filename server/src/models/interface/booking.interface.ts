import { Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  email: string;
  drivingLicenseExpiry: Date;
  carId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}
