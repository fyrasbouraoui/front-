import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StatusService } from '../services/status.service'; // Import StatusService
import { Status } from '../interface/status.model'; // Assuming you have a Status model
import { Validation1Service } from '../services/validation1.service';

@Component({
  selector: 'app-gerdemande',
  templateUrl: './gerdemande.component.html',
  styleUrls: ['./gerdemande.component.scss'],
})
export class GerdemandeComponent implements OnInit {
  displayedColumns: string[] = ['description', 'nomApp','status' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _demandeservice: DemandeServiceService,
    private statusService: StatusService, // Inject StatusService
    private validation1:Validation1Service
  ) {}

  ngOnInit(): void {
    this.getDemande();
  }

  getDemande() {
    this._demandeservice.getDemande().subscribe({
      next: (res: any) => {
        console.log(res); // Log the received data
        
        // Assign unique identifiers to each row
        res.forEach((item: any, index: number) => { // Specify type for index as number
          item.id = index + 1; // Assuming index + 1 as the unique identifier
        });
  
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error,
    });
  }

  handleCheckIconClick(userId: number, structureId: number, profilId: number, demandeId: number): void {
    this._demandeservice.validateDemande(userId, structureId, profilId, demandeId)
      .subscribe(
        response => {
          console.log('Validation successful:', response);
          // Handle successful validation (e.g., display a success message)
        },
        error => {
          console.error('Validation failed:', error);
          // Handle validation failure (e.g., display an error message)
        }
      );
  }
  isSubMenu: boolean = false;

    toggleSub(){
        this.isSubMenu = !this.isSubMenu;

    }
    handleDeleteIconClick(id: number): void {
      if (confirm('Are you sure you want to delete this demande?')) {
        this._demandeservice.deleteDemande(id)
          .subscribe(
            response => {
              console.log('Deletion successful:', response);
              // Reload the demande list or update the table
              this.getDemande();
              // Optionally, display a success message
            },
            error => {
              console.error('Deletion failed:', error);
              // Optionally, display an error message
            }
          );
      }
    }
    moveRow(rowData: any) {
      console.log("Moving row:", rowData);

      this.validation1.sendRowData(rowData);
    }
}
