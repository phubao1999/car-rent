import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoreService } from '../services/core.service';

export const bookingGuard: CanActivateFn = (route, state) => {
  const coreService = inject(CoreService);
  const router = inject(Router);
  if (!coreService.currentCarBooking()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
