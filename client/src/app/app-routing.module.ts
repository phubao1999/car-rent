import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './core/templates/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './core/templates/main-layout/main-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: AdminLoginComponent },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
