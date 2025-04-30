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
        // Handle unauthorized access
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unauthorized access - redirecting to login',
        });
        router.navigate(['']);
        // Optionally, you can redirect to a login page or show a notification
      } else if (error.status === 404) {
        // Handle not found
        console.error('Resource not found');
      } else {
        // Handle other errors
        console.error('An error occurred:', error);
      }
      return throwError(() => error);
    })
  );
};
