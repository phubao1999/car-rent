import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICarAvailable } from '../models/car.interface';
import { IBookingRequest } from '../models/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private baseURL = environment.apiUrl;

  currentCarBooking = signal<ICarAvailable | null>({
    _id: '6813448d4f309b3b0e1eb940',
    brand: 'Toyota',
    model: 'Yaris',
    stock: 3,
    peakSeasonPrice: 98.43,
    midSeasonPrice: 76.89,
    offSeasonPrice: 53.65,
    totalPrice: 384.45,
    averagePrice: 76.89,
  });
  period = signal<{ startDate: string; endDate: string } | null>({
    startDate: '2025-05-02',
    endDate: '2025-05-06',
  });

  constructor(private http: HttpClient) {}

  getCarsAvailable(
    startDate: string,
    endDate: string
  ): Observable<ICarAvailable[]> {
    return this.http.get<ICarAvailable[]>(
      `${this.baseURL}/cars/available?startDate=${startDate}&endDate=${endDate}`
    );
  }

  bookingCar(body: IBookingRequest): Observable<any> {
    return this.http.post(`${this.baseURL}/cars/book`, body);
  }

  updateCurrentCarBooking(car: ICarAvailable) {
    this.currentCarBooking.set(car);
  }

  updatePeriod(startDate: string, endDate: string) {
    this.period.set({ startDate, endDate });
  }
}
