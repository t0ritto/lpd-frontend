import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenUrl = 'http://localhost:8080/realms/archive/protocol/openid-connect/token';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username?: string, password?: string): void {
    if (!username || !password) return;

    const body = new HttpParams()
      .set('client_id', 'LPD')
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post<any>(this.tokenUrl, body, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed');
        console.error(err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
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

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
