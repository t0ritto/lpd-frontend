import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token on successful login', () => {
    const mockToken = 'mock-token';
    service.login('testuser', 'password');

    const req = httpMock.expectOne('http://localhost:8080/realms/archive/protocol/openid-connect/token');
    expect(req.request.method).toBe('POST');

    req.flush({ access_token: mockToken });
    expect(localStorage.getItem('auth_token')).toBe(mockToken);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should decode token and return user ID', () => {
    const mockTokenPayload = { sub: 'user-1234' };
    const mockToken = `${btoa(JSON.stringify({ alg: 'none' }))}.${btoa(JSON.stringify(mockTokenPayload))}.signature`;
    localStorage.setItem('auth_token', mockToken);
    expect(service.getUserId()).toBe('user-1234');
  });

  it('should return null for invalid token', () => {
    localStorage.setItem('auth_token', 'invalid.token');
    expect(service.getUserId()).toBeNull();
  });

  it('should remove token on logout and redirect', () => {
    localStorage.setItem('auth_token', 'token');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
