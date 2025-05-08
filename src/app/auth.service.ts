import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private router: Router) {}

  login(): void {
    const redirectUri = encodeURIComponent(window.location.origin);
    window.location.href = `http://localhost:8080/realms/archive/protocol/openid-connect/auth?client_id=LPD&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}