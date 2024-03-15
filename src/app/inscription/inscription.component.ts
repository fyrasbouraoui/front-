import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

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
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      
      prenom: '',
      cin: '',
      email: '',
      password: '', // Add password field
      mobile: '',
      profileId: ''
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (createdUser: any) => {
          alert('User registered successfully' );
          // Optionally, you can reset the form here
          this.userForm.reset();
        },
        error: (err: any) => {
          console.error('User registration failed:', err);
          // Optionally, display an error message to the user
        }
      });
    }
  }
  

}
