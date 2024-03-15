// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/user.model';
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
      next: (user: User) => {
        alert('Login successful');
        // Redirect to another component or route upon successful login
        this.router.navigate(['/form']); // Change '/dashboard' to the desired route
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}
