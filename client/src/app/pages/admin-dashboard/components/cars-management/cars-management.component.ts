import { UtilityService } from './../../../../utils/utility.service';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../../core/services/core.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ICar } from '../../../../core/models/car.interface';

@Component({
  selector: 'app-cars-management',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './cars-management.component.html',
  styleUrl: './cars-management.component.scss',
})
export class CarsManagementComponent implements OnInit {
  cars: ICar[] = [];
  carsClone: ICar[] = [];
  disabledBtn: boolean = false;

  constructor(
    private coreService: CoreService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.coreService.getCars().subscribe((res) => {
      this.cars = res;
    });
  }

  onRowEditInit(car: ICar) {
    this.carsClone = this.cloneCars(this.cars);
    this.disabledBtn = true;
  }

  onRowEditSave(car: ICar) {
    this.carsClone = this.cloneCars(this.cars);
    this.disabledBtn = false;
  }

  onRowEditCancel(car: ICar) {
    this.cars = this.carsClone;
    this.disabledBtn = false;
  }

  updateCars() {
    if (this.validateCars()) {
      this.coreService.updateCars(this.cars).subscribe((res) => {
        this.utilityService.showMessage(
          'success',
          'Cars updated successfully',
          'The cars have been updated successfully.'
        );
      });
    } else {
      this.utilityService.showMessage(
        'error',
        'Invalid car data',
        'Please check the prices.'
      );
    }
  }

  validateCars(): boolean {
    for (const car of this.cars) {
      if (
        car.peakSeasonPrice == null ||
        car.midSeasonPrice == null ||
        car.offSeasonPrice == null
      ) {
        return false;
      }
    }
    return true;
  }

  private cloneCars(cars: ICar[]): ICar[] {
    let carsClone: ICar[] = [];
    for (let i = 0; i < cars.length; i++) {
      carsClone[i] = { ...cars[i] };
    }
    return carsClone;
  }
}
