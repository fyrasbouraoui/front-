import { Component } from '@angular/core';

@Component({
  selector: 'app-listeuser',
  templateUrl: './listeuser.component.html',
  styleUrl: './listeuser.component.scss'
})
export class ListeuserComponent {
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
}
