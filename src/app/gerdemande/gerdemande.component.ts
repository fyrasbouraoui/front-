import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { Validation1Service } from '../services/validation1.service';
@Component({
  selector: 'app-gerdemande',
  templateUrl: './gerdemande.component.html',
  styleUrl: './gerdemande.component.scss'
})
export class GerdemandeComponent {
  isSubMenuVisible: boolean = false;
  displayedColumns: string[] = ['description','nomApp', 'action'
  ]
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor( private _demandeservice: DemandeServiceService, private validationService: Validation1Service){}
ngOnInit(): void {
  this.getDemande(); 
  
  }
 

    getDemande() {
      this._demandeservice.getDemande().subscribe({
        next: (res) => {
          console.log(res); // Log the received data
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });}
      toggleSubMenu() {
        this.isSubMenuVisible = !this.isSubMenuVisible;
      }
      handleCheckIconClick(row: any) {
        console.log('Check icon clicked in GerdemandeComponent. Data:');

        this.validationService.setSelectedData(row);
        
      }

}



