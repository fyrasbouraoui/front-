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
  selector: 'app-validation1',
  templateUrl: './validation1.component.html',
  styleUrls: ['./validation1.component.scss']
})
export class Validation1Component implements OnInit {
  userName: string = '';
  profileName: string = '';
  demandes: Demande[] = [];
  isSubMenu: boolean = false;
  validationMessage: string = '';

  constructor(private demandeService: DemandeServiceService,
    private statusService: StatusService,
    private userService: UserService,
    private router: Router,
    private dialog:MatDialog 

  ) {}

  ngOnInit() {
    this.fetchDemandes();
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

  fetchDemandes() {
    // Fetch demandes from the service
    this.demandeService.getDemandesByStatus('En attente de 1ere validation').subscribe(
      (demandes: Demande[]) => {
        this.demandes = demandes;
        // Iterate through each demand and fetch its status
        this.demandes.forEach(demande => {
          this.getStatusForDemande(demande);
        });
      },
      (error) => {
        console.error('Error fetching demandes:', error);
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
          if (demande.statuses.length === 0) {
            // If no statuses are available, set a default status
            const defaultStatus: Status = {
              codeStatus: 0, // Set appropriate codeStatus
              nomStatus: 'En attente de validation', // Default nomStatus
              description: '' // Set appropriate description if needed
            };
            demande.statuses.push(defaultStatus);
          }
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

  handleCheckIconClick(id: number): void {
    
    const userInfo = this.userService.getUserInfo();

    if (userInfo !== null) {
      const userId = userInfo.idUser;
      console.log('Retrieved userId:', userId);

      if (!userId) {
        console.error('Invalid userId:', userId);
        return;
      }

      this.demandeService.validateDemande(id, userId).subscribe(
        (response: string) => {
          console.log('Validation success:', response);
          alert("Validation success")

          this.validationMessage = response;

          // After successful validation, refetch the demandes
          this.fetchDemandes();
        },
        (error: any) => {
          console.error('Validation error:', error);
          alert("Validation error")
        }
      );
    } else {
      console.error('User info is null.');
    }
  }
  showDetails(row: any) {
    const dialogRef = this.dialog.open(ShowDemandeDetailComponent, {
      width: '500px',
      data: row 
    });}
}
