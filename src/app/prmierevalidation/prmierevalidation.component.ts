import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DemandeServiceService } from '../services/demande-service.service';

@Component({
  selector: 'app-prmiere-validation',
  templateUrl: './prmierevalidation.component.html',
  styleUrls: ['./prmierevalidation.component.scss'],
})
export class PrmiereValidationComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['description','nomApp' ];  

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private _demandeservice: DemandeServiceService,) {}

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
    });
  }
}

