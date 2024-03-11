import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],
})
export class DialogComponentComponent {
  addform: FormGroup;
  constructor(
    private _fb: FormBuilder, 
    private _apiservice:ApiService, 
    private _dialogRef: DialogRef<DialogComponentComponent>)
  {
    this.addform = this._fb.group({
      idApi: '',
      nom: '',
      code:'',
      description:'',
      input:'',
      output:'',
      cadre:'',
      methode:'',
      cadreUtilisation:'',
      url:'',
      impact:'',
      mode:'',

    })
  }
  FormSubmit(){
    if(this.addform.valid){
      this._apiservice.addApi(this.addform.value).subscribe({
        next: (val: any) => {
          alert('Ajouter avec succes');
          this._dialogRef.close();

        },
        error: (err: any) =>{
          console.error(err);
        }
      })
    }
  }

}
