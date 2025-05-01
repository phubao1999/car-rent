import { Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoading = signal(false);
  constructor(private messageService: MessageService) {}

  showLoading() {
    this.isLoading.set(true);
  }
  hideLoading() {
    this.isLoading.set(false);
  }

  showMessage(
    severity: 'success' | 'error' | 'info' | 'warn',
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }
}
