// inscription.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<InscriptionComponent>
  ) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', Validators.required],
      nomProfil: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const profileName = userData.nomProfil;
      
      this.userService.createUser(userData, profileName).subscribe({
        next: (response) => {
          alert('User registered successfully');
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('User registration failed:', err);
          alert('User registration failed. Please try again.');
        }
      });
    }
  }
}
