import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StatusService } from '../services/status.service';
import { Status } from '../interface/status.model';
import { Validation1Service } from '../services/validation1.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-gerdemande',
  templateUrl: './gerdemande.component.html',
  styleUrls: ['./gerdemande.component.scss'],
})
export class GerdemandeComponent implements OnInit {
  displayedColumns: string[] = ['description', 'nomApp', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  validationMessage: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _demandeservice: DemandeServiceService,
    private statusService: StatusService,
    private validation1: Validation1Service,
    private userService: UserService // Inject the UserService

  ) {}

  ngOnInit(): void {
    this.getAllDemandes();  }

    getAllDemandes() {
      this._demandeservice.getAllDemandes().subscribe({ // Use getAllDemandes
        next: (res: any[]) => { // Use array type any[]
          console.log(res); // Log the received data
          
  
          // Assign unique identifiers to each row
          res.forEach((item: any, index: number) => {
            item.id = index + 1; // Assuming index + 1 as the unique identifier
          });
  
          // Fetch status data for each demande
          this.fetchStatusForDemandes(res);
        },
        error: console.error,
      });
    }
    
  

  fetchStatusForDemandes(demandes: any[]): void {
    demandes.forEach((demande: any) => {
      // Check if the demande has status data
      if (demande.status && demande.status.length > 0) {
        // Assuming there's only one status per demande, you can directly access the first status object
        demande.nomStatus = demande.status[0].nomStatus;
      }
    });
    // After processing all demandes, update the data source
    this.updateDataSource(demandes);
  }
  
  
  

  updateDataSource(data: any[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 

  toggleSub(): void {
    this.isSubMenu = !this.isSubMenu;
  }

  handleDeleteIconClick(id: number): void {
    if (confirm('Are you sure you want to delete this demande?')) {
      this._demandeservice.deleteDemande(id)
        .subscribe(
          response => {
            console.log('Deletion successful:', response);
            // Reload the demande list or update the table
            this.getAllDemandes();
            // Optionally, display a success message
          },
          error => {
            console.error('Deletion failed:', error);
            // Optionally, display an error message
          }
        );
    }
  }
  handleCheckIconClick(id: number): void {
    const userInfo = this.userService.getUserInfo();

    if (userInfo !== null) {
        const userId = userInfo.idUser;
        console.log('Retrieved userId:', userId);

        if (!userId) {
            console.error('Invalid userId:', userId);
            return;
        }

        this._demandeservice.validateDemande(id, userId).subscribe(
            (response: string) => {
                console.log('Validation success:', response);
                this.validationMessage = response;
            },
            (error: any) => {
                console.error('Validation error:', error);
            }
        );
    } else {
        console.error('User info is null.');
    }
}



 

  isSubMenu: boolean = false;
}
