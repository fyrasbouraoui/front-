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
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: [''],
      nomProfil: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.createUser(userData).subscribe({
        next: (user) => {
          // Create a profile object with the received nomProfil and a dummy code (you might need to adjust this)
          const profilData = { code: 0, nomProfil: userData.nomProfil };
          this.profileService.createProfile(profilData).subscribe({
            next: () => {
              alert('User registered successfully');
              this.dialogRef.close();
            },
            error: (err) => {
              console.error('Failed to create profile:', err);
              alert('Failed to create profile. Please try again.');
            }
          });
        },
        error: (err) => {
          console.error('User registration failed:', err);
          alert('User registration failed. Please try again.');
        }
      });
    }
  }
}
