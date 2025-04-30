import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoading = signal(false);
  constructor() {}

  showLoading() {
    this.isLoading.set(true);
  }
  hideLoading() {
    this.isLoading.set(false);
  }
}
