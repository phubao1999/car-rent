import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { SeasonsManagementComponent } from './components/seasons-management/seasons-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SeasonsManagementComponent],
  providers: [AdminService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
