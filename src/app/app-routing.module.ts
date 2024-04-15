import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ListeComponent } from './listeapi/liste.component';
import { AddComponent } from './add/add.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { GerdemandeComponent } from './listedemande/gerdemande.component';
import { ListeuserComponent } from './listeuser/listeuser.component';
import {  PrmiereValidationComponent } from './prmierevalidation/prmierevalidation.component';
import { ConnectionComponent } from './connection/connection.component';
import { Validation1Component } from './validation1/validation1.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { Validation2Component } from './validation2/validation2.component';
import { ListestructureComponent } from './listestructure/listestructure.component';
import {dashboardComponent} from './dashboard/dashboard.component';
import { ListedemandeconsommateurComponent } from './listedemandeconsommateur/listedemandeconsommateur.component';

const routes: Routes = [
  { path: 'form', component: FormulaireComponent },
  { path: 'liste', component: ListeComponent },
  {path: 'acceuil', component:AddComponent} ,
  {path: 'add', component:AcceuilComponent} ,
  {path: 'profile', component:ProfileComponent} ,
  {path: 'test', component:TestComponent},
  {path: 'demande',component:GerdemandeComponent},
  {path: 'user',component:ListeuserComponent},
  { path: 'pval', component: PrmiereValidationComponent },
  { path: 'inscrit', component: InscriptionComponent },
  { path: 'connect', component: ConnectionComponent },
  { path: 'validation1', component: Validation1Component },
  { path: 'validation2', component: Validation2Component },
  { path: 'str', component: ListestructureComponent },
  { path: 'dashboard', component:dashboardComponent },
  {path: 'demandecons' , component:ListedemandeconsommateurComponent}







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
