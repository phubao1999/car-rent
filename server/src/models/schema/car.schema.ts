import mongoose, { Schema } from 'mongoose';
import { ICar } from '../interface/car.interface';

export const carSchema: Schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  stock: { type: Number, required: true },
  peakSeasonPrice: { type: Number, required: true },
  midSeasonPrice: { type: Number, required: true },
  offSeasonPrice: { type: Number, required: true },
});

export const Car = mongoose.model<ICar>('Car', carSchema);
