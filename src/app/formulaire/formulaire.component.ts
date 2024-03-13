import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemandeServiceService } from '../services/demande-service.service';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.scss'
})
export class FormulaireComponent {
  demandeform: FormGroup;
  isSubMenuVisible: boolean = false;
  constructor(
    private _fb: FormBuilder, 
    private _demandeservice:DemandeServiceService)
  {
    this.demandeform = this._fb.group({
      
      description: '',
      nomApp:'',
      hebergeurApp:'',
      publie:'',
      nomDomaineApp:'',
      adresseIpApp:'',
      typeConnexion:'',
      nombreAppelAn:'',
      nombreAppelMin:'',
      invoMasse:'',
      paysHebergeur:'',
      dateInvMasse:'',
      raisonInMasse:'',
      dateCreation:'',
      dateModification:'',

    })
  }
  FormSubmit(){
    if(this.demandeform.valid){
      this._demandeservice.addDemande(this.demandeform.value).subscribe({
        next: (val: any) => {
          alert('Ajouter avec succes');

        },
        error: (err: any) =>{
          console.error(err);
        }
      })
    }
  }
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

}

