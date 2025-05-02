import { Document } from 'mongoose';

export interface IPeriod {
  startDate: Date;
  endDate: Date;
}

export interface ISeason extends Document {
  name: string;
  code: string;
  periods: IPeriod[];
}
