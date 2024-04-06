import { Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from '../Ajoutapi/dialog-component.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditdialogComponent } from '../editapi/editdialog.component';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {
  userName: string = '';
  profileName: string = '';
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  isSubMenu: boolean = false;

    toggleSub(){
        this.isSubMenu = !this.isSubMenu;

    }
    displayedColumns: string[] = ['id','nom', 'code', 'description', 'input', 'output', 'cadreUtilisation','action']
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private userService: UserService,private _dialog:MatDialog ,private router: Router, private _apiservice: ApiService){}
ngOnInit(): void {
  this.getapis(); 
  this.getUserDetails();
    const arrow = document.querySelectorAll(".arrow");
    arrow.forEach(arrowItem => {
      arrowItem.addEventListener("click", (e) => {
        const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle("showMenu");
        }
      });
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".bx-menu") as HTMLElement;

    if (sidebar) {
      // Remove 'close' class to expand the sidebar by default
      sidebar.classList.remove("close");
    }

    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    }
  }
  getUserDetails() {
    // Fetch user details from the UserService
    const userInfo = this.userService.getUserInfo(); // Assuming this method returns user information
    if (userInfo) {
      this.userName = userInfo.prenom; // Update 'prenom' with the actual property name for the user's name
      this.profileName = userInfo.profileName; // Update 'profileName' with the actual property name for the profile name
    }
  }
  logout() {
    this.userService.logout().subscribe(
      () => {
        // Redirect to the '/connect' page after successful logout
        this.router.navigate(['/connect']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
  openAddEditEmpForm() {
    this._dialog.open(DialogComponentComponent);
  }

    getapis() {
      this._apiservice.getAllApis().subscribe({
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
    
    
      deleteApi(idApi: number): void {
        // Call the delete API service method
        this._apiservice.deleteApi(idApi).subscribe({
          next: () => {
            // Remove the deleted item from the data source
            this.dataSource.data = this.dataSource.data.filter((item: any) => item.idApi !== idApi);
            console.log('API deleted successfully');
          },
          error: (error: any) => {
            console.error('Error deleting API:', error);
          }
        });
      }
}
