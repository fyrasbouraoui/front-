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
  selector: 'app-listeapicons',
  templateUrl: './listeapicons.component.html',
  styleUrl: './listeapicons.component.scss'
})
export class ListeapiconsComponent {
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
  

  getApis() {
    this._apiservice.getAllApis().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
        this.dataSource.paginator = this.paginator; // Set paginator
        this.updateDisplayedRows(); // Update displayed rows
      },
      error: console.error,
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
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.paginator.pageIndex = this.currentPage;
            this.paginator._changePageSize(this.paginator.pageSize);
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
    }
