import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ISeasons } from '../../core/models';
import { Observable } from 'rxjs';
import { ICar } from '../../core/models/car.interface';

@Injectable()
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  test() {
    return this.http.get(`${this.apiUrl}/test`);
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  getSeasons(): Observable<ISeasons[]> {
    return this.http.get<ISeasons[]>(`${this.apiUrl}/seasons`);
  }

  updateSeasons(seasons: ISeasons[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/seasons`, { seasons });
  }

  getCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${this.apiUrl}/cars`);
  }

  updateCars(cars: ICar[]): Observable<ICar[]> {
    return this.http.put<ICar[]>(`${this.apiUrl}/cars`, cars);
  }
}
