import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { OfficersComponent } from './views/officers/officers.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'officers', component: OfficersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];


