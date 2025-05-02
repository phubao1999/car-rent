import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICarAvailable } from '../models/car.interface';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private baseURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCarsAvailable(
    startDate: string,
    endDate: string
  ): Observable<ICarAvailable[]> {
    return this.http.get<ICarAvailable[]>(
      `${this.baseURL}/cars/available?startDate=${startDate}&endDate=${endDate}`
    );
  }
}
