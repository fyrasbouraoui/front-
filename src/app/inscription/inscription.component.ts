// inscription.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StructureService } from '../services/structure.service';
import { Structure } from '../interface/structure.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  userForm: FormGroup;
  structures: Structure[] = [];


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private structureService: StructureService,

    private profileService: ProfileService,
    public dialogRef: MatDialogRef<InscriptionComponent>
  ) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', Validators.required],
      structureId: [''],
      nomProfil: ['', Validators.required]
    });
  }
  
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
