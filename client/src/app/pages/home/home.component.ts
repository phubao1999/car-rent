import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { CoreService } from '../../core/services/core.service';
import { UtilityService } from '../../utils/utility.service';
import { finalize } from 'rxjs';
import { ICarAvailable } from '../../core/models/car.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MessageModule,
    CalendarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  cars: ICarAvailable[] = [];
  loading: boolean = false;

  constructor(
    private coreService: CoreService,
    private utilityService: UtilityService
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
            this.loading = false;
          })
        )
        .subscribe((res) => {
          console.log(res);
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
    console.log(car);
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
