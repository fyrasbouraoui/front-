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
import { ShowApiDetailComponent } from '../show-api-detail/show-api-detail.component';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {
  searchText: any;
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any= [5,10,15,20]
  userName: string = '';
  profileName: string = '';
  isSubMenuVisible: boolean = false;
  displayedRows: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
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
  this.getApis(); 
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
      sidebar.classList.remove("close");
    }

    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    }
  }
  getUserDetails() {
    const userInfo = this.userService.getUserInfo(); 
    if (userInfo) {
      this.userName = userInfo.prenom; 
      this.profileName = userInfo.profileName;
    }
  }
  logout() {
    this.userService.logout().subscribe(
      () => {
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

  getApis() {
    this._apiservice.getAllApis().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
        this.updateDisplayedRows();
      },
      error: console.log,
    });
  }

      editRow(row: any) {
        
        const dialogRef = this._dialog.open(EditdialogComponent, {
          data: { row: { ...row } }, 
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            const index = this.dataSource.data.indexOf(row);
            this.dataSource.data[index] = result;
           
            this.dataSource._updateChangeSubscription();
            this.getApis();

          }
        });
      }
    
    
      deleteApi(idApi: number): void {
        this._apiservice.deleteApi(idApi).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter((item: any) => item.idApi !== idApi);
            console.log('API deleted successfully');
              this.getApis();
          },
          error: (error: any) => {
            console.error('Error deleting API:', error);
          }
        });
      }
      showDetails(row: any) {
        const dialogRef = this._dialog.open(ShowApiDetailComponent, {
          width: '400px',
          data: row // Pass the selected row data to the dialog component
        });
      }
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updateDisplayedRows();
        }
      }
    
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updateDisplayedRows();
        }
      }
    
      goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.updateDisplayedRows();
        }
      }
    
      updateDisplayedRows() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.dataSource.data.length);
        this.displayedRows = this.dataSource.data.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
        this.updatePageNumbers();
      }
      updatePageNumbers() {
        this.pageNumbers = [];
        for (let i = 1; i <= this.totalPages; i++) {
          this.pageNumbers.push(i);
        }
      }
      onTableDataChange(event: any): void {
        this.page = event;
        this.getApis(); 
      }
    }
