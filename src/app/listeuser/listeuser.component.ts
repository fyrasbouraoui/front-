import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-listeuser',
  templateUrl: './listeuser.component.html',
  styleUrls: ['./listeuser.component.scss']
})
export class ListeuserComponent implements OnInit {
  selectedUser: User | null = null; // Property to store the selected user

  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  registeredUsers: User[] = []; // Declare the registeredUsers property

  constructor(private userService: UserService,private dialog: MatDialog) {}

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

