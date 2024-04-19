import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { Demande } from '../interface/demande.model';
import { Status } from '../interface/status.model';
import { StatusService } from '../services/status.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 
import { ShowDemandeDetailComponent } from '../show-demande-detail/show-demande-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { RejectionReasonDialogComponent } from '../rejection-reason-dialog/rejection-reason-dialog.component';
@Component({
  selector: 'app-demandetermineecons',
  templateUrl: './demandetermineecons.component.html',
  styleUrl: './demandetermineecons.component.scss'
})
export class DemandetermineeconsComponent implements OnInit {
  searchText: any;
  userName: string = '';
  profileName: string = '';
  demandes: Demande[] = [];
  isSubMenu: boolean = false;
  validationMessage: string = '';
  page: number=1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any= [5,10,15,20]

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
    // Fetch demandes from the service for a specific user with status "La demande a été rejetée par le 1er validateur."
    this.demandeService.getDemandesByUserIdAndStatus(userId, "La demande a été rejetée par le 1er validateur.").subscribe(
      (demandes1: Demande[]) => {
        console.log('Demandes fetched successfully (La demande a été rejetée par le 1er validateur. ):', demandes1);
        
        // Fetch demandes from the service for a specific user with status "La demande a été rejetée par le 2ème validateur."
        this.demandeService.getDemandesByUserIdAndStatus(userId, "La demande a été rejetée par le 2ème validateur.").subscribe(
          (demandes2: Demande[]) => {
            console.log('Demandes fetched successfully (La demande a été rejetée par le 2ème validateur.):', demandes2);
            
            // Fetch demandes from the service for a specific user with status "Validation Confirmer par 2ème validateur"
            this.demandeService.getDemandesByUserIdAndStatus(userId, "Validation Confirmer par 2ème validateur").subscribe(
              (demandes3: Demande[]) => {
                console.log('Demandes fetched successfully (Validation Confirmer par 2ème validateur):', demandes3);
                
                // Combine the results from all calls
                const allDemandes = [...demandes1, ...demandes2, ...demandes3];
                console.log('All Demandes:', allDemandes);
                
                // Assign the combined demandes to this.demandes
                this.demandes = allDemandes;
                
                // Iterate through each demand and fetch its status
                this.demandes.forEach(demande => {
                  this.getStatusForDemande(demande);
                });
              },
              (error) => {
                console.error('Error fetching demandes (Validation Confirmer par 2ème validateur):', error);
                // Handle error, show error message, etc.
              }
            );
          },
          (error) => {
            console.error('Error fetching demandes (La demande a été rejetée par le 2ème validateur.):', error);
            // Handle error, show error message, etc.
          }
        );
      },
      (error) => {
        console.error('Error fetching demandes (La demande a été rejetée par le 1er validateur.):', error);
        // Handle error, show error message, etc.
      }
    );
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
showRejectionReason(status: Status): void {
  // Check if the status has a rejection reason
  if (status.raisonRefus) {
    this.dialog.open(RejectionReasonDialogComponent, {
      width: '250px',
      data: { status: status }
    });
  }
}
onTableDataChange(event: any): void {
  this.page = event;
  const userInfo = this.userService.getUserInfo();
  if (userInfo) {
    const userId = userInfo.idUser;
    this.fetchDemandes(userId);
  } else {
    console.error('User info is null.');
  }
}
}
