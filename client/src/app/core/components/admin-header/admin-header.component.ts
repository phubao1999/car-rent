import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AdminService } from '../../../pages/admin-dashboard/admin.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [ButtonModule, CommonModule, MenuModule],
  providers: [AdminService],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Car Rent History',
          icon: 'pi pi-fw pi-calendar',
          routerLink: '/admin/car-rent-history',
        },
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: '/admin/dashboard',
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            this.onLogout();
          },
        },
      ],
    },
  ];

  get isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
  }

  constructor(private adminService: AdminService, private router: Router) {}
  onLogout() {
    if (this.isLogin) {
      this.adminService.logout().subscribe((res) => {
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      });
    }
  }
}
