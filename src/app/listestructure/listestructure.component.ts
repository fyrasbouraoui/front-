import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { Router } from '@angular/router'; 
import { Structure } from '../interface/structure.model';
import { StructureService } from '../services/structure.service';
import { InscriptionstrComponent } from '../inscriptionstr/inscriptionstr.component';
@Component({
  selector: 'app-listestructure',
  templateUrl: './listestructure.component.html',
  styleUrl: './listestructure.component.scss'
})
export class ListestructureComponent implements OnInit {
  userName: string = '';
  profileName: string = '';
  selectedUser: User | null = null; // Property to store the selected user

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

    openAddUserModal() {
      const dialogRef = this.dialog.open(InscriptionstrComponent, {
        width: '400px' 
      });
    }
    openUpdateUserDialog(user: User) {
      const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
        width: '400px', 
        data: user
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Pass the idUser parameter when calling updateUser method
          this.userService.updateUser(user.idUser, result).subscribe({
            next: () => {
              // Success message or other actions
            },
            error: (err: any) => {
              console.error('User update failed:', err);
              // Handle error
            }
          });
        }
      });
    }
    showDetails(user: User, index: number) {
      this.selectedUser = user;
      const rowElement = document.getElementById(`user-row-${index}`);
      if (rowElement) {
          const rect = rowElement.getBoundingClientRect();
          const topOffset = rect.top + window.pageYOffset + rowElement.offsetHeight;
          const leftOffset = rect.left + window.pageXOffset;
          const detailsSection = document.querySelector('.details-section') as HTMLElement;
          detailsSection.style.top = `${topOffset}px`;
          detailsSection.style.left = `${leftOffset}px`;
      }
  }
  
}


