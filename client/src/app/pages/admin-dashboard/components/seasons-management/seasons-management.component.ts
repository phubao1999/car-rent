import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ISeasons } from '../../../../core/models';
import { AdminService } from '../../admin.service';
import { UtilityService } from '../../../../utils/utility.service';

@Component({
  selector: 'app-seasons-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DatePickerModule,
    ButtonModule,
  ],
  providers: [],
  templateUrl: './seasons-management.component.html',
  styleUrl: './seasons-management.component.scss',
})
export class SeasonsManagementComponent implements OnInit {
  seasonsForm: FormGroup;

  get seasons(): FormArray {
    return this.seasonsForm.get('seasons') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    this.seasonsForm = this.fb.group({
      seasons: this.fb.array([], this.noOverlappingPeriodsValidator()),
    });
  }

  ngOnInit(): void {
    this.fetchSeasons();
  }

  fetchSeasons() {
    this.adminService.getSeasons().subscribe((seasons: ISeasons[]) => {
      const seasonsArray = this.seasonsForm.get('seasons') as FormArray;
      seasons.forEach((season) => {
        const seasonGroup = this.createSeasonGroup(season);
        seasonsArray.push(seasonGroup);

        const periodsArray = seasonGroup.get('periods') as FormArray;
        season.periods.forEach((period, index) => {
          periodsArray.at(index).patchValue({
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
          });
        });
      });
    });
  }

  createSeasonGroup(season: ISeasons): FormGroup {
    return this.fb.group({
      name: [season.name, Validators.required],
      periods: this.fb.array(
        season.periods.map(() =>
          this.fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
          })
        )
      ),
    });
  }

  getPeriods(seasonIndex: number): FormArray {
    return this.seasons.at(seasonIndex).get('periods') as FormArray;
  }

  addPeriod(seasonIndex: number) {
    const periods = this.getPeriods(seasonIndex);
    periods.push(
      this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      })
    );
  }

  removePeriod(seasonIndex: number, periodIndex: number) {
    const periods = this.getPeriods(seasonIndex);
    if (periods.length > 1) {
      periods.removeAt(periodIndex);
    }
  }

  saveSeasons() {
    if (this.seasonsForm.valid) {
      const updatedSeasons: ISeasons[] = this.seasonsForm.value.seasons;
      updatedSeasons.map(
        (season) => (season.code = this.mappingCodeForSeason(season.name))
      );
      this.adminService.updateSeasons(updatedSeasons).subscribe(() => {
        this.utilityService.showMessage(
          'success',
          'Success',
          'Seasons updated successfully'
        );
      });
    } else {
      this.utilityService.showMessage(
        'error',
        'Validation Error',
        'Error: Some periods overlap within a season. Please fix them.'
      );
    }
  }

  noOverlappingPeriodsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const seasons = control.value as ISeasons[];
      const allPeriods: {
        startDate: number;
        endDate: number;
        seasonName: string;
      }[] = [];

      // Collect all periods from all seasons
      for (const season of seasons) {
        for (const period of season.periods) {
          const startDate = new Date(period.startDate).getTime();
          const endDate = new Date(period.endDate).getTime();
          allPeriods.push({ startDate, endDate, seasonName: season.name });
        }
      }

      // Check for overlaps between all periods
      for (let i = 0; i < allPeriods.length; i++) {
        for (let j = i + 1; j < allPeriods.length; j++) {
          const period1 = allPeriods[i];
          const period2 = allPeriods[j];

          if (
            period1.startDate <= period2.endDate &&
            period1.endDate >= period2.startDate
          ) {
            return { overlappingPeriods: true };
          }
        }
      }

      return null;
    };
  }

  mappingCodeForSeason(seasonName: string): string {
    return (
      seasonName
        .toLowerCase()
        .split(' ')
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('') + 'Price'
    );
  }
}
