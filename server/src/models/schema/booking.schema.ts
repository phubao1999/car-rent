import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../interface/booking.interface';

export const bookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
