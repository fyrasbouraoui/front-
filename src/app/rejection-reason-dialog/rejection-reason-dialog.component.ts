import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from '../interface/status.model';

@Component({
  selector: 'app-rejection-reason-dialog',
  templateUrl: './rejection-reason-dialog.component.html',
})
export class RejectionReasonDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { status: Status }) {}
}
