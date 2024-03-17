import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      password: '',
      mobile: ''
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          alert('User registered successfully');
          this.userForm.reset();
        },
        error: (err: any) => {
          console.error('User registration failed:', err);
          alert('User registration failed. Please try again.');
        }
      });
    }
  }
}
