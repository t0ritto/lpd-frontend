import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="toolbar-title">Settings</span>
    </mat-toolbar>

    <div class="main-layout">
      <nav class="sidebar">
        <ul>
          <li><a routerLink="/dashboard" routerLinkActive="active"><mat-icon>home</mat-icon> Home</a></li>
          <li><a routerLink="/officers" routerLinkActive="active"><mat-icon>groups</mat-icon> (LPD) Officers</a></li>
          <li><a routerLink="/lmi" routerLinkActive="active"><mat-icon>medical_services</mat-icon> LMI</a></li>
          <li><a routerLink="/ldoj" routerLinkActive="active"><mat-icon>gavel</mat-icon> LDOJ</a></li>
          <li><a routerLink="/slrt" routerLinkActive="active"><mat-icon>security</mat-icon> SLRT</a></li>
        </ul>
        <ul class="bottom">
          <li><a (click)="logout()"><mat-icon>logout</mat-icon> Logout</a></li>
        </ul>
      </nav>

      <div class="content">
        <mat-card>
          <h2>Settings</h2>
          <p>Welcome, <strong>{{ userRole }}</strong> user. This is your settings panel.</p>
          <p>Here you can manage user-specific configurations and preferences (functionality coming soon).</p>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userRole = '';
  private readonly ldojKeycloakId = 'dd1c4484-0710-40bb-87f7-4f5b14b6316a';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId === this.ldojKeycloakId) {
      this.userRole = 'LDOJ';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
