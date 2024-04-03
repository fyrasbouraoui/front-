import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Demande } from '../interface/demande.model';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { DemandeServiceService } from '../services/demande-service.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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
        nomAPI: [''],
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

    // Hide the current step
    const currentStep = document.querySelector('.main.active');
    if (currentStep) {
      currentStep.classList.remove('active');
    }

    // Show the next step
    const nextStep = document.querySelector('.main:nth-child(' + (this.formnumber + 2) + ')');
    if (nextStep) {
      nextStep.classList.add('active');
    }

    // Increment the form number
    this.formnumber++;

    // Update the step number in the progress bar
    this.num.innerHTML = (this.formnumber + 1).toString();

    // Update the progress bar
    this.progressForward();

    // Update the step content indicator
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
