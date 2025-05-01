import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsManagementComponent } from './seasons-management.component';

describe('SeasonsManagementComponent', () => {
  let component: SeasonsManagementComponent;
  let fixture: ComponentFixture<SeasonsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
