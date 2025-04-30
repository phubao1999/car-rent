import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UtilityService } from '../../utils/utility.service';
import { finalize } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const utilityService = inject(UtilityService);
  const token = localStorage.getItem('token');
  utilityService.showLoading();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(finalize(() => utilityService.hideLoading()));
};
