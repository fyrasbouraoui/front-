import { Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from '../Ajoutapi/dialog-component.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditdialogComponent } from '../editapi/editdialog.component';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  isSubMenu: boolean = false;

    toggleSub(){
        this.isSubMenu = !this.isSubMenu;

    }
    displayedColumns: string[] = ['nom', 'code', 'description', 'input', 'output', 'cadreUtilisation','action']
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private _dialog:MatDialog , private _apiservice: ApiService){}
ngOnInit(): void {
  this.getapis(); 
  
}
  openAddEditEmpForm() {
    this._dialog.open(DialogComponentComponent);
  }

    getapis() {
      this._apiservice.getApis().subscribe({
        next: (res) => {
          console.log(res); // Log the received data
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });}

      editRow(row: any) {
        // Open edit dialogue with the selected row
        const dialogRef = this._dialog.open(EditdialogComponent, {
          data: { row: { ...row } }, // Pass a copy of the selected row to prevent changes in the table during editing
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            // Update the row in the data source
            const index = this.dataSource.data.indexOf(row);
            this.dataSource.data[index] = result;
            // Add logic to save the edited data to the backend using your API service
            // this._apiservice.updateApi(result).subscribe(/* handle success/error */);
            this.dataSource._updateChangeSubscription(); // Trigger update in the data source
          }
        });
      }
    
    
      deleteRow(row: any) {
        // Add your delete logic here
        console.log('Delete row:', row);
      }
}
