import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAdminResponse } from '../../core/models';

@Injectable()
export class AdminAuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(body: { email: string; password: string }): Observable<IAdminResponse> {
    return this.http.post<IAdminResponse>(this.apiUrl, body);
  }
}
