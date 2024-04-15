import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { Demande } from '../interface/demande.model';
import { Status } from '../interface/status.model';
import { StatusService } from '../services/status.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 
import { ShowDemandeDetailComponent } from '../show-demande-detail/show-demande-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listedemandeconsommateur',
  templateUrl: './listedemandeconsommateur.component.html',
  styleUrl: './listedemandeconsommateur.component.scss'
})
export class ListedemandeconsommateurComponent  implements OnInit {
  userName: string = '';
  profileName: string = '';
  demandes: Demande[] = [];
  isSubMenu: boolean = false;
  validationMessage: string = '';

  constructor(
    private demandeService: DemandeServiceService,
    private statusService: StatusService,
    private userService: UserService,
    private router: Router,
    private dialog:MatDialog 
  ) {}

  ngOnInit() {
    // Fetch demandes upon component initialization
    const userInfo = this.userService.getUserInfo(); // Assuming this method returns user information
    if (userInfo) {
      const userId = userInfo.idUser; // Get the user ID
      this.fetchDemandes(userId); // Fetch demandes for the user
    }    
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

  toggleSub() {
    // Toggle the submenu
    this.isSubMenu = !this.isSubMenu;
  }

  fetchDemandes(userId: number) {
    // Fetch demandes from the service for a specific user
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      this.demandeService.getDemandeById(userId).subscribe(
        (demande: Demande) => {
          console.log('Demande fetched successfully:', demande);
          this.demandes = [demande]; // Assuming you want to display only one demand
          // Fetch status for the demand
          this.getStatusForDemande(demande);
        },
        (error) => {
          console.error('Error fetching demande:', error);
          // Handle error, show error message, etc.
        }
      );
    }
  }
  

  getStatusForDemande(demande: Demande) {
    // Check if idDemande is defined before passing it to getStatusByDemandeId
    if (demande.idDemande !== undefined) {
        this.statusService.getStatusByDemandeId(demande.idDemande).subscribe(
            (statuses: Status[]) => {
                demande.statuses = statuses; // Assign the statuses to the demand
            },
            (error) => {
                console.error('Error fetching status for demande:', error);
                // Handle error, show error message, etc.
            }
        );
    } else {
        console.error('Cannot get status for demande: idDemande is undefined');
        // Handle error, show error message, etc.
    }
}


showDetails(row: any) {
  const dialogRef = this.dialog.open(ShowDemandeDetailComponent, {
    width: '1000px',
    data: row // Pass the selected row data to the dialog component
  });

}
}
