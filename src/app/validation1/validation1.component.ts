import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service'; // Adjust the import path as per your project structure
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Demande } from '../interface/demande.model'; // Assuming you have a Demande interface

@Component({
  selector: 'app-validation1',
  templateUrl: './validation1.component.html',
  styleUrls: ['./validation1.component.scss']
})
export class Validation1Component implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Demande>;
  displayedColumns: string[] = ['description', 'nomApp', 'status', 'action'];
  private rowDataSubscription: Subscription;

  constructor(private demandeService: DemandeServiceService) {
    this.rowDataSubscription = this.demandeService.getDemandesByStatus('Validation 1er validateur').subscribe(
      (data: Demande[]) => {
        console.log("Received data:", data);
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error("Error fetching demandes:", error);
        // Handle error, show error message, etc.
      }
    );
  }

  ngOnInit() {
    // Any initialization logic here
  }

  ngOnDestroy() {
    this.rowDataSubscription.unsubscribe();
  }

  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  isSubMenu: boolean = false;

  toggleSub() {
    this.isSubMenu = !this.isSubMenu;
  }
}
