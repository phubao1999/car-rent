import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../interface/booking.interface';

export const bookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  drivingLicenseExpiry: { type: Date, required: true },
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
