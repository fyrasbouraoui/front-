import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']  // Use 'styleUrls' instead of 'styleUrl'
})
export class EditdialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: any },
  ) {
    this.editForm = this.fb.group({
      idApi: [''], // Assuming this is a number or string
      nom: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      input: [''],
      output: [''],
      cadreUtilisation: [''],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    // Save the edited data
    const updatedData = this.editForm.value;  // Get the form values

    // Pass the updated data to the service

    // Close the dialog
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.editForm.patchValue(this.data.row);
  }
}
