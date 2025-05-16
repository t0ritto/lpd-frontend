import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SettingsComponent } from './settings.component';
import { AuthService } from '../auth/auth.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserId: jasmine.createSpy('getUserId')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockAuthService.getUserId.and.returnValue('dd1c4484-0710-40bb-87f7-4f5b14b6316a');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set userRole to LDOJ if user ID matches', () => {
    mockAuthService.getUserId.and.returnValue('dd1c4484-0710-40bb-87f7-4f5b14b6316a');
    fixture.detectChanges();
    expect(component.userRole).toBe('LDOJ');
  });

  it('should redirect to dashboard if user ID does not match', () => {
    mockAuthService.getUserId.and.returnValue('some-other-id');
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
