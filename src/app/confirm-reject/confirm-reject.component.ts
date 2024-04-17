import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectDialogData } from '../interface/confirmreject.model';

@Component({
  selector: 'app-confirm-reject',
  templateUrl: './confirm-reject.component.html',
  styleUrls: ['./confirm-reject.component.scss']
})
export class ConfirmRejectComponent {
  rejectionMessage: string = ''; // Initialize rejection message variable

  constructor(@Inject(MAT_DIALOG_DATA) public data: RejectDialogData) {}
}
