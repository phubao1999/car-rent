import { Document } from 'mongoose';

export interface ICar extends Document {
  _id: string;
  brand: string;
  carModel: string;
  stock: number;
  peakSeasonPrice: number;
  midSeasonPrice: number;
  offSeasonPrice: number;
}
