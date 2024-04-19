import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { Structure } from '../interface/structure.model';
import { StructureService } from '../services/structure.service';
import { InscriptionstrComponent } from '../inscriptionstr/inscriptionstr.component';
import { UpdateStructureDialogComponent } from '../update-structure-dialog/update-structure-dialog.component';
@Component({
  selector: 'app-listestructure',
  templateUrl: './listestructure.component.html',
  styleUrl: './listestructure.component.scss'
})
export class ListestructureComponent implements OnInit {
  searchText: any;
  userName: string = '';
  profileName: string = '';
  selectedUser: User | null = null; // Property to store the selected user
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any= [5,10,15,20]
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  structures: Structure[] = [];

  constructor(private router: Router,private userService: UserService,private dialog: MatDialog, 
       private structureService: StructureService, // Inject the StructureService
) {}

  ngOnInit(): void {
    this.getAllStructures(); // Call method to fetch all structures on component initialization
  }
  getAllStructures() {
    this.structureService.getAllStructures().subscribe({
      next: (structures: Structure[]) => {
        console.log(structures);
        this.structures = structures;
      },
      error: (err: any) => {
        console.error('Error fetching structures:', err);
        // Optionally, display an error message to the user
      }
    });
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
  isSubMenu: boolean = false;

    toggleSub(){
        this.isSubMenu = !this.isSubMenu;

    }

    openAddStrModal() {
      const dialogRef = this.dialog.open(InscriptionstrComponent, {
        width: '400px' 
      });
    }
    
    editStructure(structure: Structure) {
      const dialogRef = this.dialog.open(UpdateStructureDialogComponent, {
        width: '400px', height: 'auto',
        data: structure
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result && structure.idstr !== undefined) {
          this.structureService.updateStructure(structure.idstr, result).subscribe({
            next: updatedStructure => {
              const index = this.structures.findIndex(s => s.idstr === updatedStructure.idstr);
              if (index !== -1) {
                this.structures[index] = updatedStructure;
              }
            },
            error: (err: any) => {
              console.error('Structure update failed:', err);
            }
          });
        }
      });
    }
    deleteStructure(id: number | undefined) {
      if (id !== undefined) {
        this.structureService.deleteStructure(id).subscribe({
          next: () => {
            this.structures = this.structures.filter(structure => structure.idstr !== id);
            console.log('Structure deleted successfully');
          },
          error: (err: any) => {
            console.error('Error deleting structure:', err);
          }
        });
      } else {
        console.error('Error: id is undefined');
      }
    }
    
    onTableDataChange(event: any): void {
      this.page = event;
      this.getAllStructures(); 
    }
}


