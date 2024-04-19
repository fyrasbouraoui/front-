import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Structure } from '../interface/structure.model';

@Component({
  selector: 'app-update-structure-dialog',
  templateUrl: './update-structure-dialog.component.html',
  styleUrls: ['./update-structure-dialog.component.scss']
})
export class UpdateStructureDialogComponent {
  structureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Structure
  ) {
    this.structureForm = this.fb.group({
      code: [data.code, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      telStr: [data.telStr, Validators.required],
      adresse: [data.adresse, Validators.required],
      role: [data.role, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.structureForm.value); // Log form values
    if (this.structureForm.valid) {
      // Close dialog and pass updated structure form value to the caller
      this.dialogRef.close(this.structureForm.value);
    }
  }

  onCancelClick(): void {
    // Close the dialog without performing any action
    this.dialogRef.close();
  }
}
