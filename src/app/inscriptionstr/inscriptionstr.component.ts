import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StructureService } from '../services/structure.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscriptionstr',
  templateUrl: './inscriptionstr.component.html',
  styleUrls: ['./inscriptionstr.component.scss']
})
export class InscriptionstrComponent {
  structureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService, // Corrected injection to StructureService
    private userService: UserService, // Inject UserService for accessing local storage
    public dialogRef: MatDialogRef<InscriptionstrComponent>
  ) {
    this.structureForm = this.fb.group({
      nom: ['', Validators.required], // Set up form controls with validators


      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telStr: ['', Validators.required],
      adresse: ['', Validators.required],
      role:['', Validators.required]
    });
  }

  onSubmit() {
    if (this.structureForm.valid) {
      const structureData = this.structureForm.value;
      const profileName = this.userService.getUserInfo()?.profileName; // Retrieve profileName from local storage
      
      if (profileName) {
        this.structureService.registerStructure(structureData, profileName).subscribe({
          next: (response) => {
            alert('Structure registered successfully');
            this.dialogRef.close();
          },
          error: (err) => {
            console.error('Structure registration failed:', err);
            alert('Structure registration failed. Please try again.');
          }
        });
      } else {
        console.error('Profile name not found in local storage');
        alert('Profile name not found. Please log in again.');
        // You may want to handle this case differently based on your application's requirements
      }
    }
  }
}
