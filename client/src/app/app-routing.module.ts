import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/templates/main-layout/main-layout.component';
import { AdminLayoutComponent } from './core/templates/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
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
      { path: 'login', component: AdminLoginComponent },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
