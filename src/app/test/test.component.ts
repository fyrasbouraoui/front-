import { Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{
  displayedColumns: string[] = ['idApi', 'nom', 'code', 'description', 'input', 'output', 'cadreUtilisation','action']
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private _dialog:MatDialog , private _apiservice: ApiService){}
ngOnInit(): void {
  this.getapi(); 
  
}
  openAddEditEmpForm() {
    this._dialog.open(DialogComponentComponent);
  }

    getapi() {
      this._apiservice.getApi().subscribe({
        next: (res) => {
          console.log(res); // Log the received data
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });}

      editRow(row: any) {
        // Add your edit logic here
        console.log('Edit row:', row);
      }
    
      deleteRow(row: any) {
        // Add your delete logic here
        console.log('Delete row:', row);
      }

}






