import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from '../admin-dashboard/admin.service';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [CommonModule, TableModule],
  providers: [AdminService],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.scss',
})
export class AdminHistoryComponent implements OnInit {
  bookings: any[] = [];
  totalAmount: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getBookings().subscribe((res) => {
      this.bookings = res;
      this.totalAmount = this.bookings.reduce(
        (acc, booking) => acc + booking.totalPrice,
        0
      );
    });
  }
}
