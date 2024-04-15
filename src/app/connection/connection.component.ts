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
        localStorage.setItem('currentUser', JSON.stringify(response)); // Store user info in local storage
        console.log('User information saved:', response);
        
        // Check the profileName
        const profileName = response.profileName;
        if (profileName === 'consommateur') {
          this.router.navigate(['/form']);
        } else if (profileName === 'admin' || profileName === '1er validateur' || profileName === '2eme validateur') {
          this.router.navigate(['/dashboard']);
        } 
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}
