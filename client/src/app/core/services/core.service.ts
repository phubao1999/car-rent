import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICar } from '../models/car.interface';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${this.apiUrl}/car`);
  }

  updateCars(cars: ICar[]): Observable<ICar[]> {
    return this.http.put<ICar[]>(`${this.apiUrl}/car`, cars);
  }
}
