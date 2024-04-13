import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-showuserdetail',
  templateUrl: './showuserdetail.component.html',
  styleUrl: './showuserdetail.component.scss'
})
export class ShowuserdetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
