import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './core/templates/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './core/templates/main-layout/main-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { adminGuard } from './core/auth/admin.guard';

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
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
