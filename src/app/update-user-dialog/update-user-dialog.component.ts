import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'] // Corrected here
})
export class UpdateUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.fb.group({
      prenom: [data.prenom, Validators.required],
      cin: [data.cin, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required],
      mobile: [data.mobile]
    });
  }

  onSubmit() {
    console.log(this.userForm.value); // Add this line to log form values
    if (this.userForm.valid) {
      this.userService.updateUser(this.data.idUser, this.userForm.value)
        .subscribe({
          next: (updatedUser) => this.dialogRef.close(updatedUser),
          error: (error) => console.error('There was an error updating the user', error)
        });
    }
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
