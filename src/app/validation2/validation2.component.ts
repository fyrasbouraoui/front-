import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { Demande } from '../interface/demande.model';
import { Status } from '../interface/status.model';
import { StatusService } from '../services/status.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-validation2',
  templateUrl: './validation2.component.html',
  styleUrls: ['./validation2.component.scss']
})
export class Validation2Component implements OnInit {
  demandes: Demande[] = [];
  isSubMenu: boolean = false;
  validationMessage: string = '';

  constructor(private demandeService: DemandeServiceService,
    private statusService: StatusService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    // Fetch demandes upon component initialization
    this.fetchDemandes();
  }

  toggleSub() {
    // Toggle the submenu
    this.isSubMenu = !this.isSubMenu;
  }

  fetchDemandes() {
    // Fetch demandes from the service
    this.demandeService.getDemandesByStatus('En attente de 2eme validation').subscribe(
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
          this.validationMessage = response;

          // After successful validation, refetch the demandes
          this.fetchDemandes();
        },
        (error: any) => {
          console.error('Validation error:', error);
        }
      );
    } else {
      console.error('User info is null.');
    }
  }
}
