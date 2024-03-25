import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemandeServiceService } from '../services/demande-service.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent {
  demandeform: FormGroup;
  isSubMenuVisible: boolean = false;

  constructor(
    private _fb: FormBuilder, 
    private _demandeservice: DemandeServiceService,
    private userService: UserService, // Inject the UserService 
    private router: Router
  ) {
    this.demandeform = this._fb.group({
      description: '',
      nomApp: '',
      hebergeurApp: '',
      publie: '',
      nomDomaineApp: '',
      adresseIpApp: '',
      typeConnexion: '',
      nombreAppelAn: '',
      nombreAppelMin: '',
      invoMasse: '',
      paysHebergeur: '',
      dateInvMasse: '',
      raisonInMasse: '',
      dateCreation: '',
      dateModification: '',
    });
  }

  FormSubmit() {
    if (this.demandeform.valid) {
      // Get the user information from the service
      const userInfo = this.userService.getUserInfo() as { userId: number, profilId: number, structureId: number };
  
      // Create an object containing the demand data along with the user information
      const demandData = {
        ...this.demandeform.value,
        userId: userInfo.userId,
        profilId: userInfo.profilId,
        structureId: userInfo.structureId
      };
  
      // Make the HTTP request to create the demand with the user information
      this._demandeservice.createDemande(demandData, userInfo.structureId, userInfo.userId, userInfo.profilId).subscribe({
        next: (val: any) => {
          alert('Ajouter avec succès');
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }
  

  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  isSubMenu: boolean = false;

  toggleSub(){
    this.isSubMenu = !this.isSubMenu;
  }
  logout() {
    this.userService.logout().subscribe(
      () => {
       
        this.router.navigate(['/connect']); 
      },
      error => {
        console.error('Error logging out:', error);
      }
    );
  }
}
