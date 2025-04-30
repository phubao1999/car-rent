import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error) => {
      // Handle the error here
      if (error.status === 401 || error.status === 403) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unauthorized access - redirecting to login',
        });
        localStorage.removeItem('token');
        router.navigate(['']);
      } else if (error.status === 404) {
        console.error('Resource not found');
      } else {
        console.error('An error occurred:', error);
      }
      return throwError(() => error);
    })
  );
};
