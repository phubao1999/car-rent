import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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
}
