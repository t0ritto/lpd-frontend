import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // required for ngModel
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // <-- this line activates standalone mode
  imports: [CommonModule, FormsModule], // <-- add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password);
  }
}
