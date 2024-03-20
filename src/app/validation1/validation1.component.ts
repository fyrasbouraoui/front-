import { Component, OnDestroy } from '@angular/core';
import { Validation1Service } from '../services/validation1.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation1',
  templateUrl: './validation1.component.html',
  styleUrls: ['./validation1.component.scss']
})
export class Validation1Component implements OnDestroy {
  rowData: any;
  private rowDataSubscription: Subscription;

  constructor(private validation1service: Validation1Service) {
    this.rowDataSubscription = this.validation1service.rowData$.subscribe(data => {
      console.log("Received data:", data);
      this.rowData = data;
    });
  }

  ngOnDestroy() {
    this.rowDataSubscription.unsubscribe();
  }
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  isSubMenu: boolean = false;

    toggleSub(){
        this.isSubMenu = !this.isSubMenu;

    }
}
