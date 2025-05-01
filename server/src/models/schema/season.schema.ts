import mongoose, { Schema } from 'mongoose';
import { ISeason } from '../interface/season.interface';

const periodSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const seasonSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  periods: { type: [periodSchema], required: true },
});

export const Season = mongoose.model<ISeason>('Season', seasonSchema);
