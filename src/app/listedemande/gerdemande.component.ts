import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../services/demande-service.service';
import { Demande } from '../interface/demande.model';
import { Status } from '../interface/status.model';
import { StatusService } from '../services/status.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-gerdemande',
  templateUrl: './gerdemande.component.html',
  styleUrls: ['./gerdemande.component.scss']
})
export class GerdemandeComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    // Fetch demandes upon component initialization
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
    this.demandeService.getAllDemandes().subscribe(
      (demandes: Demande[]) => {
        console.log('Demandes fetched successfully:', demandes);
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
handleDeleteIconClick(id: number | undefined): void {
  // Check if the ID is defined before proceeding
  if (id !== undefined) {
    if (confirm('Are you sure you want to delete this demande?')) {
      this.demandeService.deleteDemande(id)
        .subscribe(
          response => {
            console.log('Deletion successful:', response);
            // Reload the demande list or update the table
            this.fetchDemandes();
            // Optionally, display a success message
          },
          error => {
            console.error('Deletion failed:', error);
            // Optionally, display an error message
          }
        );
    }
  } else {
    console.error('ID is undefined.');
    // Optionally, handle the case where ID is undefined
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
          },
          (error: any) => {
              console.error('Validation error:', error);
          }
      );
  } else {
      console.error('User info is null.');
  }
}
showDetails(row: any) {
  let detailsMessage = `Details:
- Établissement Demandeur: ${row.etablissementDemandeur}
- Établissement Fournisseur: ${row.etablissementFournisseur}
- Établissement Propriétaire: ${row.etablissementProprietaire}
- Nom API: ${row.nomAPI}
- Description API: ${row.descriptionAPI}
- Cadre API: ${row.cadreAPI}
- Données Entrée: ${row.donneesEntree}
- Données Sortie: ${row.donneesSortie}
- Impact: ${row.impact}
- Nom Hébergeur: ${row.nomHebergeur}
- Hébergeur Situé en Tunisie: ${row.hebergeurSitueTunisie}
- Pays Hébergeur: ${row.paysHebergeur}
- Application Publiée sur Internet: ${row.applicationPublieInternet}
- Nom de Domaine de l'Application: ${row.nomDomaineApplication}
- Adresses IP des Serveurs: ${row.adressesIPServeurs}
- Type de Connexion CNI: ${row.typeConnexionCNI}
- Nombre Estimé d'Appels par An: ${row.nombreEstimeAppelsAn}
- Nombre Estimé d'Appels par Minute: ${row.nombreEstimeAppelsMin}
- Besoin d'Invoquer l'API en Masse: ${row.besoinInvoquerAPIEnMasse}
- Nom Responsable CNI: ${row.nomResponsableCNI}
- Adresse Mail Professionnelle du Responsable CNI: ${row.adresseMailProfessionnelleResponsableCNI}
- Numéro de Téléphone du Responsable CNI: ${row.numeroTelephoneResponsableCNI}
- Nom Responsable: ${row.nomResponsable}
- Adresse Mail Professionnelle Responsable: ${row.adresseMailProfessionnelleResponsable}
- Numéro de Téléphone Responsable: ${row.numeroTelephoneResponsable}`;

  alert(detailsMessage);
}

}
