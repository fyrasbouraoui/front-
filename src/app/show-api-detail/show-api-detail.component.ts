import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-show-api-detail',
  templateUrl: './show-api-detail.component.html',
  styleUrl: './show-api-detail.component.scss'
})
export class ShowApiDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
