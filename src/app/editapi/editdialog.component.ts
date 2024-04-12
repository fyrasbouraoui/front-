import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService, // Inject ApiService
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: any },
  ) {
    this.editForm = this.fb.group({
      idApi: [''], 
      nom: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      input: [''],
      output: [''],
      cadreUtilisation: [''],
    });

    this.editForm.patchValue(this.data.row); // Patch form with row data
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    // Check if the form is valid
    if (this.editForm.valid) {
      // Save the edited data
      const updatedData = this.editForm.value;
      const idApi = updatedData.idApi; // Assuming idApi is part of the data

      // Call the ApiService to update the API
      this.apiService.updateApi(idApi, updatedData).subscribe(
        (response) => {
          console.log('API updated successfully:', response);
          // Optionally, notify the user or perform other actions
          this.dialogRef.close(updatedData); // Close the dialog and pass the updated data
        },
        (error) => {
          console.error('Error updating API:', error);
          // Optionally, handle the error (e.g., display error message)
        }
      );
    }
  }
}
