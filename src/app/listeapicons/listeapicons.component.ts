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
  searchText: any;
  userName: string = '';
  profileName: string = '';
  isSubMenuVisible: boolean = false;
  displayedRows: any[] = [];
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any= [5,10,15,20]

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
      onTableDataChange(event: any): void {
        this.page = event;
        this.getApis(); 
      }
    
    }
