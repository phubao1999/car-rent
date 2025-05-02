export interface ICar {
  id: string;
  brand: string;
  carModel: string;
  stock: number;
  peakSeasonPrice: number;
  midSeasonPrice: number;
  offSeasonPrice: number;
}

export interface ICarAvailable {
  averagePrice: number;
  brand: string;
  midSeasonPrice: number;
  model: string;
  offSeasonPrice: number;
  peakSeasonPrice: number;
  stock: number;
  totalPrice: number;
  _id: string;
}
