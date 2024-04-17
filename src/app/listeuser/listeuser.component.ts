import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { Router } from '@angular/router'; 
import { ShowuserdetailComponent } from '../showuserdetail/showuserdetail.component';
@Component({
  selector: 'app-listeuser',
  templateUrl: './listeuser.component.html',
  styleUrls: ['./listeuser.component.scss']
})
export class ListeuserComponent implements OnInit {
  userName: string = '';
  profileName: string = '';
  selectedUser: User | null = null; // Property to store the selected user

  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  registeredUsers: User[] = []; // Declare the registeredUsers property

  constructor(private router: Router,private userService: UserService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers(); // Call the method to fetch all users when the component initializes
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Assign a unique identifier to each user
        console.log(users);
        this.registeredUsers = users.map((user, index) => ({ ...user, id: index + 1 }));
        
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
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
      this.profileName = userInfo.profileName;    }
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
    deleteUser(idUser: number) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(idUser).subscribe({
          next: () => {
            // Filter out the deleted user from the registeredUsers array
            this.registeredUsers = this.registeredUsers.filter(user => user.idUser !== idUser);
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
            // Optionally, display an error message to the user
          }
        });
      }
    }
    openAddUserModal() {
      const dialogRef = this.dialog.open(InscriptionComponent, {
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
    showDetails(row: any) {
      const dialogRef = this.dialog.open(ShowuserdetailComponent, {
        width: '400px',
        data: row // Pass the selected row data to the dialog component
      });
    
  }
  
}

