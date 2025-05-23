import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'officers',
    loadComponent: () =>
      import('./views/officers/officers.component').then(m => m.OfficersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'ldoj',
    loadComponent: () =>
      import('./views/ldoj/ldoj.component').then(m => m.LdojComponent),
    canActivate: [AuthGuard]
  },

  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];
