import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsManagementComponent } from './cars-management.component';

describe('CarsManagementComponent', () => {
  let component: CarsManagementComponent;
  let fixture: ComponentFixture<CarsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
