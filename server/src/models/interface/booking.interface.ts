import { Document } from 'mongoose';

export interface IBooking extends Document {
  userId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
}
