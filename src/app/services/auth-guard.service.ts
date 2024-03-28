// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      const requiredRole = 'admin'; // Set the required role or permission
      const userRole = localStorage.getItem('user_profile'); // Get the user's profile name
      if (userRole === requiredRole) {
        return true; // Allow access if user's profile matches required role
      } else {
        // Redirect to unauthorized page or handle accordingly
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login page if user is not logged in
      return false;
    }
  }
}
