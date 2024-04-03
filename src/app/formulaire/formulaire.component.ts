import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { DemandeServiceService } from '../services/demande-service.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit{
  demandeform: FormGroup;
  isSubMenuVisible: boolean = false;
  apis: any[] = [];

  ngOnInit(): void {
    this.getApis();
  }
  getApis(): void {
    this.apiService.getAllApis()
      .subscribe(apis => this.apis = apis);
  }
  constructor(
    private apiService: ApiService,
    private _fb: FormBuilder, 
    private _demandeservice: DemandeServiceService,
    private userService: UserService, // Inject the UserService 
    private router: Router
  ) {
    this.demandeform = this._fb.group({
      etablissementDemandeur: ['', Validators.required],
      etablissementFournisseur: ['', Validators.required],
      etablissementProprietaire: ['', Validators.required],
      nomAPI: ['', Validators.required],
      descriptionAPI: ['', Validators.required],
      cadreAPI: ['', Validators.required],
      donneesEntree: ['', Validators.required],
      donneesSortie: ['', Validators.required],
      impact: ['', Validators.required],
      nomHebergeur: ['', Validators.required],
      hebergeurSitueTunisie: [''],
      paysHebergeur: [''],
      applicationPublieInternet: [''],
      nomDomaineApplication: [''],
      adressesIPServeurs: [''],
      typeConnexionCNI: [''],
      nombreEstimeAppelsAn: ['', Validators.required],
      nombreEstimeAppelsMin: ['', Validators.required],
      besoinInvoquerAPIEnMasse: [''],
      nomResponsableCNI: [''],
      adresseMailProfessionnelleResponsableCNI: [''],
      numeroTelephoneResponsableCNI: [''],
      nomResponsable: [''],
      adresseMailProfessionnelleResponsable: [''],
      numeroTelephoneResponsable: ['']
    });
  }

  FormSubmit() {
    if (this.demandeform.valid) {
      // Get the user information from the service
      const userInfo = this.userService.getUserInfo();

      // Check if userInfo is not null
      if (userInfo) {
        // Create an object containing the demand data along with the user information
        const demandData = {
          ...this.demandeform.value,
          userId: userInfo.idUser,
          profilId: userInfo.profileId,
          structureId: userInfo.structureId
        };

        // Make the HTTP request to create the demand with the user information
        this._demandeservice.createDemande(demandData, userInfo.structureId, userInfo.idUser, userInfo.profileId).subscribe({
          next: (val: any) => {
            alert('Ajouter avec succès');
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        console.error('User information is null');
      }
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
