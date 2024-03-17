import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.authenticate(this.email, this.password).subscribe({
      next: (response: any) => {
        alert('Login successful');
        // Assuming the backend response contains user ID, profile ID, and structure ID
        this.userService.setUserInfo(response.userId, response.profileId, response.structureId);
        localStorage.setItem('currentUser', JSON.stringify(response));
        const userInfo = this.userService.getUserInfo();
        console.log('User information saved:', userInfo);
        this.router.navigate(['/form']); // Navigate to the form page
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}
