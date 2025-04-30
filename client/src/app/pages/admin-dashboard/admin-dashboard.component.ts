import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  providers: [AdminService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.test().subscribe((res) => {
      console.log(res);
    });
  }
}
