import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { SeasonsManagementComponent } from './components/seasons-management/seasons-management.component';
import { CarsManagementComponent } from './components/cars-management/cars-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SeasonsManagementComponent, CarsManagementComponent],
  providers: [AdminService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
