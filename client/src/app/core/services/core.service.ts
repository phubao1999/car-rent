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

  currentCarBooking = signal<ICarAvailable | null>(null);
  period = signal<{ startDate: string; endDate: string } | null>(null);

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
