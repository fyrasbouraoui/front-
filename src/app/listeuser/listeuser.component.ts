import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';

@Component({
  selector: 'app-listeuser',
  templateUrl: './listeuser.component.html',
  styleUrls: ['./listeuser.component.scss']
})
export class ListeuserComponent implements OnInit {
  isSubMenuVisible: boolean = false;
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  registeredUsers: User[] = []; // Declare the registeredUsers property

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers(); // Call the method to fetch all users when the component initializes
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Assign a unique identifier to each user
        console.log(users);
        this.registeredUsers = users.map((user, index) => ({ ...user, id: index + 1, profileId: user.profileId }));
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
}

