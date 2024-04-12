import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { DemandeServiceService } from '../services/demande-service.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 
import { ApiService } from '../services/api.service';
import { Demande } from '../interface/demande.model';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit{
  userName: string = '';
  profileName: string = '';
  demandes: Demande[] = [];
  formnumber: number = 0;
  step_list: any;
  num: any;
  demandeform: FormGroup;
  apis: any[] = [];



  constructor(    private _demandeservice: DemandeServiceService,
    private userService: UserService, private router: Router,    private _fb: FormBuilder, 
    private apiService: ApiService,

    ) {
      this.demandeform = this._fb.group({
        etablissementDemandeur: [''],
        etablissementFournisseur: [''],
        etablissementProprietaire: [''],
        nomAPI: ['', Validators.required],
        descriptionAPI: [''],
        cadreAPI: [''],
        donneesEntree: [''],
        donneesSortie: [''],
        impact: [''],
        nomHebergeur: [''],
        hebergeurSitueTunisie: [''],
        paysHebergeur: [''],
        applicationPublieInternet: [''],
        nomDomaineApplication: [''],
        adressesIPServeurs: [''],
        typeConnexionCNI: [''],
        nombreEstimeAppelsAn: [''],
        nombreEstimeAppelsMin: [''],
        besoinInvoquerAPIEnMasse: [''],
        nomResponsableCNI: [''],
        adresseMailProfessionnelleResponsableCNI: [''],
        numeroTelephoneResponsableCNI: [''],
        nomResponsable: [''],
        adresseMailProfessionnelleResponsable: [''],
        numeroTelephoneResponsable: ['']
      });
     }
     getApis(): void {
      this.apiService.getAllApis()
        .subscribe(apis => this.apis = apis);
    }
     FormSubmit(event: Event) {
      event.preventDefault();
      console.log('Form submitted');

      if (this.demandeform.valid) {
        // Get the user information from the service
        const userInfo = this.userService.getUserInfo();
        console.log('Form submitted successfully');
        const hebergeurSitueTunisieValue = this.demandeform.value.hebergeurSitueTunisie === 'oui';
        const besoinInvoquerAPIEnMasse = this.demandeform.value.besoinInvoquerAPIEnMasse === 'oui';
        const applicationPublieInternet = this.demandeform.value.applicationPublieInternet === 'oui';




        // Check if userInfo is not null
        if (userInfo) {
          // Create an object containing the demand data along with the user information
          const demandData = {
            ...this.demandeform.value,
            hebergeurSitueTunisie: hebergeurSitueTunisieValue,
            besoinInvoquerAPIEnMasse: besoinInvoquerAPIEnMasse,
            applicationPublieInternet: applicationPublieInternet,



            userId: userInfo.idUser,
            profilId: userInfo.profileId,
            structureId: userInfo.structureId,
            apiId: this.demandeform.value.nomAPI

          };
  
          // Make the HTTP request to create the demand with the user information
        this._demandeservice.createDemande(demandData, userInfo.structureId, userInfo.idUser, userInfo.profileId,demandData.apiId).subscribe({
            next: (val: any) => {
              console.log('Demande created successfully:', val);
              alert('Ajouter avec succès');
            },
            error: (err: any) => {
              console.error('Error creating demande:', err);
            }
          });
        } else {
          console.error('User information is null');
          console.log('Form is invalid');

        }
      }
    }
  ngOnInit(): void {
    this.getApis();
    this.getUserDetails();
    this.step_list = document.querySelectorAll(".progress-bar li");
    this.num = document.querySelector(".step-number");

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
      sidebar.classList.remove("close");
    }

    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    }
        console.log('Step elements:', this.step_list);

  }

  getUserDetails() {
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      this.userName = userInfo.prenom;
      this.profileName = userInfo.profileName;
    }
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.router.navigate(['/connect']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  nextStep(): void {
    if (!this.validateForm()) {
      return;
    }

    const currentStep = document.querySelector('.main.active');
    if (currentStep) {
      currentStep.classList.remove('active');
    }

    const nextStep = document.querySelector('.main:nth-child(' + (this.formnumber + 2) + ')');
    if (nextStep) {
      nextStep.classList.add('active');
    }

    this.formnumber++;

    this.num.innerHTML = (this.formnumber + 1).toString();

    this.progressForward();

    this.contentChange();
}


  prevStep() {
    this.formnumber--;
    this.progressBackward();
    this.contentChange();
  }

  progressForward() {
    this.num.innerHTML = this.formnumber + 1;
    const currentStep = this.step_list[this.formnumber];
    if (currentStep) {
        currentStep.classList.add('active');
    } else {
        console.error('Step element is undefined');
    }
}
  progressBackward() {
    const form_num = this.formnumber + 1;
    this.step_list[form_num].classList.remove('active');
    this.num.innerHTML = form_num;
  }

  contentChange() {
    const steps = document.querySelectorAll(".steps-content .step-number-content");
    steps.forEach((step: any, index: number) => {
      if (index === this.formnumber) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  validateForm() {
    let validate = true;
    const validate_inputs = document.querySelectorAll(".main.active input");
    validate_inputs.forEach((validate_input: any) => {
      validate_input.classList.remove('warning');
      if (validate_input.hasAttribute('require')) {
        if (validate_input.value.length === 0) {
          validate = false;
          validate_input.classList.add('warning');
        }
      }
    });
    return validate;
  }
}
