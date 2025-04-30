import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AdminService } from '../../../pages/admin-dashboard/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  providers: [AdminService],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  get isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
  }

  constructor(private adminService: AdminService, private router: Router) {}
  onLogout() {
    this.adminService.logout().subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigate(['/admin/login']);
    });
  }
}
