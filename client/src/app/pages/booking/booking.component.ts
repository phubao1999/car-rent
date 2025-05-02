import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { CoreService } from '../../core/services/core.service';
import { UtilityService } from '../../utils/utility.service';
import { IBookingRequest } from '../../core/models/booking.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DatePickerModule,
    CardModule,
  ],
  providers: [],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  steps = [
    { label: 'Collect Information' },
    { label: 'Confirm Information' },
    { label: 'Payment' },
  ];
  activeStep = 1;
  bookingForm!: FormGroup;
  paymentForm!: FormGroup;
  couponCodes = environment.couponCodes;
  discountApplied = false;
  discountPrice: number = 0;

  get bookingPrice() {
    return {
      averagePrice: this.coreService.currentCarBooking()?.averagePrice,
      brand: this.coreService.currentCarBooking()?.brand,
      model: this.coreService.currentCarBooking()?.model,
      totalPrice: this.coreService.currentCarBooking()?.totalPrice,
      startDate: this.coreService.period()?.startDate,
      endDate: this.coreService.period()?.endDate,
    };
  }

  constructor(
    private coreService: CoreService,
    private utilityService: UtilityService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        drivingLicenseIssued: ['', Validators.required],
        drivingLicenseExpiry: ['', Validators.required],
        licenseNumber: ['', Validators.required],
      },
      {
        validators: [this.licenseIssuedBeforeExpiryValidator],
      }
    );
    this.paymentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      creditCardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ],
      securityCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardExpiration: ['', Validators.required],
      coupon: [''],
    });
  }

  finishBooking() {
    const bookingData: IBookingRequest = {
      name: this.bookingForm.get('name')?.value,
      email: this.bookingForm.get('email')?.value,
      drivingLicenseExpiry: this.bookingForm.get('drivingLicenseExpiry')?.value,
      carId: this.coreService.currentCarBooking()?._id || '',
      startDate: this.coreService.period()?.startDate || '',
      endDate: this.coreService.period()?.endDate || '',
    };
    this.coreService.bookingCar(bookingData).subscribe((res) => {
      this.utilityService.showMessage(
        'success',
        res.message,
        'Your booking request has been successfully created. Please check your email for confirmation.'
      );
      this.router.navigate(['/']);
    });
  }

  licenseIssuedBeforeExpiryValidator(group: AbstractControl) {
    const issued = group.get('drivingLicenseIssued')?.value;
    const expiry = group.get('drivingLicenseExpiry')?.value;

    if (issued && expiry && new Date(issued) >= new Date(expiry)) {
      return { licenseIssuedAfterExpiry: true };
    }
    return null;
  }

  hasError(errorName: string): boolean {
    return this.bookingForm.hasError(errorName);
  }

  nextStep(activateCallback: (step: number) => void) {
    if (this.activeStep === 1 && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    if (this.activeStep === 1 && !this.checkValidLicenseDates()) {
      this.utilityService.showMessage(
        'error',
        'Error',
        'Your license is expired to book a car.'
      );
      return;
    }

    activateCallback(this.activeStep + 1);
  }

  applyCoupon() {
    const enteredCoupon = this.paymentForm.get('coupon')?.value;
    const couponCode = this.couponCodes.find(
      (code) => code.name === enteredCoupon
    );
    if (couponCode) {
      this.discountApplied = true;
      this.discountPrice =
        ((this.bookingPrice.totalPrice ?? 0) * (couponCode.discount ?? 0)) /
        100;
      this.updatePriceToBooking();
    } else {
      this.discountApplied = false;
      this.discountPrice = 0;
      this.updatePriceToBooking();
      this.utilityService.showMessage(
        'error',
        'Invalid Coupon',
        'The coupon code you entered is invalid.'
      );
    }
  }

  private checkValidLicenseDates(): boolean {
    const expiry = this.bookingForm.get('drivingLicenseExpiry')?.value;
    const bookingEndDate = this.bookingPrice.endDate;
    return (
      expiry && bookingEndDate && new Date(expiry) > new Date(bookingEndDate)
    );
  }

  private updatePriceToBooking() {
    const currentCarBooking = this.coreService.currentCarBooking();
    if (currentCarBooking) {
      currentCarBooking.totalPrice =
        currentCarBooking.totalPrice - this.discountPrice;
      this.coreService.updateCurrentCarBooking(currentCarBooking);
    }
  }
}
