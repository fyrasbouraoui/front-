import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-show-demande-detail',
  templateUrl: './show-demande-detail.component.html',
  styleUrl: './show-demande-detail.component.scss'
})
export class ShowDemandeDetailComponent {
  rejectionMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rejectionMessage = data.rejectionMessage || '';

  }

}
