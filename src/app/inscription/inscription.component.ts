import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  userForm: FormGroup;
  isSubMenuVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router 
  ) {
    this.userForm = this.fb.group({
      prenom: ['', Validators.required], 
      cin: ['', Validators.required],    
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      mobile: [''] 
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          alert('User registered successfully');
          this.userForm.reset();
          this.router.navigate(['/connect']);
        },
        error: (err: any) => {
          console.error('User registration failed:', err);
          alert('User registration failed. Please try again.');
        }
      });
    }
  }
}
