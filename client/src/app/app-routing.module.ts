import { Routes } from '@angular/router';
import { adminGuard } from './core/auth/admin.guard';
import { AdminLayoutComponent } from './core/templates/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminHistoryComponent } from './pages/admin-history/admin-history.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ],
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
      {
        path: 'car-rent-history',
        component: AdminHistoryComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
