// inscription.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { MatDialogRef } from '@angular/material/dialog';
<<<<<<< Updated upstream
=======
import { StructureService } from '../services/structure.service';
import { Structure } from '../interface/structure.model';
import { RegisterStructureRequest } from '../interface/registerstructurerequest.model';
import { RegisterRequest } from '../interface/registerrequest.model';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

=======
  
  fetchAllStructures() {
    this.structureService.getAllStructures().subscribe({
      next: (structures: Structure[]) => {
        console.log(structures);
        this.structures = structures.filter(structure => structure.code !== null);
      },
      error: (err: any) => {
        console.error('Error fetching structures:', err);
        // Optionally, display an error message to the user
      }
    });
  }
  ngOnInit(): void {
    this.fetchAllStructures(); // Fetch structures when the component initializes
  }
  
>>>>>>> Stashed changes
  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const profileName = userData.nomProfil;
      const structureId = userData.structureId;
  
      console.log('User Data:', userData);
      console.log('Profile Name:', profileName);
      console.log('Structure ID:', structureId);
      
      this.structureService.getStructureById(structureId).subscribe({
        next: (structureData: RegisterStructureRequest) => {
          console.log('Structure Data:', structureData);
      
          // Assuming you have the registerRequestData and registerStructureRequestData already defined or obtained from somewhere
          const registerRequestData: RegisterRequest = {
            firstname: this.userForm.get('firstname')?.value,
            lastname: this.userForm.get('lastname')?.value,
            cin: this.userForm.get('cin')?.value,
            email: this.userForm.get('email')?.value,
            password: this.userForm.get('password')?.value,
            mobile: this.userForm.get('mobile')?.value,
            grade: 'example_grade_value', // Provide a default value or fetch from the form if available
            // Add other properties as needed
        }; 
          const registerStructureRequestData = structureData;
      
          this.userService.createUser(registerRequestData, profileName, registerStructureRequestData).subscribe({
            next: (response) => {
              alert('User registered successfully');
              this.dialogRef.close();
            },
            error: (err) => {
              console.error('User registration failed:', err);
              alert('User registration failed. Please try again.');
            }
          });
        },
        error: (err) => {
          console.error('Failed to fetch structure data:', err);
          alert('Failed to fetch structure data. Please try again.');
        }
      });
    }
  }
  
  
  
  
}
