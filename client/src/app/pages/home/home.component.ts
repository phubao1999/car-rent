import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { ICarAvailable } from '../../core/models/car.interface';
import { CoreService } from '../../core/services/core.service';
import { UtilityService } from '../../utils/utility.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MessageModule,
    DatePickerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  cars: ICarAvailable[] = [];
  loading: boolean = false;
  today: Date = new Date();
  count = 0;

  constructor(
    private coreService: CoreService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  searchCars() {
    if (!this.startDate || !this.endDate) {
      this.utilityService.showMessage(
        'error',
        'Error',
        'Please select both start and end dates.'
      );
    } else {
      const startDateString = this.formatDate(this.startDate);
      const endDateString = this.formatDate(this.endDate);
      this.loading = true;
      this.coreService
        .getCarsAvailable(startDateString, endDateString)
        .pipe(
          finalize(() => {
            this.count++;
            this.loading = false;
          })
        )
        .subscribe((res) => {
          this.cars = res;
        });
    }
  }

  setToday() {
    const today = new Date();
    this.startDate = today;
    this.endDate = today;
    this.searchCars();
  }

  bookCar(car: ICarAvailable) {
    this.coreService.updateCurrentCarBooking(car);
    this.coreService.updatePeriod(
      this.formatDate(this.startDate),
      this.formatDate(this.endDate)
    );
    this.router.navigate(['/booking']);
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
