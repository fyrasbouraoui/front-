import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ListeComponent } from './liste/liste.component';
import { AddComponent } from './add/add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { GerdemandeComponent } from './gerdemande/gerdemande.component';
import { ListeuserComponent } from './listeuser/listeuser.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { PrmiereValidationComponent } from './prmierevalidation/prmierevalidation.component';


@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    ListeComponent,
    AddComponent,
    AcceuilComponent,
    ProfileComponent,
    GerdemandeComponent,
    ListeuserComponent,
    TestComponent,
    DialogComponentComponent,
    PrmiereValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
