import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ListeComponent } from './listeapi/liste.component';
import { AddComponent } from './add/add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { GerdemandeComponent } from './listedemande/gerdemande.component';
import { ListeuserComponent } from './listeuser/listeuser.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponentComponent } from './Ajoutapi/dialog-component.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { PrmiereValidationComponent } from './prmierevalidation/prmierevalidation.component';
import { Validation1Service } from './services/validation1.service';
import { EditdialogComponent } from './editapi/editdialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConnectionComponent } from './connection/connection.component';
import { FormsModule } from '@angular/forms';
import { Validation1Component } from './validation1/validation1.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component'; // Import FormsModule
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

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
    PrmiereValidationComponent,
    EditdialogComponent,
    InscriptionComponent,
    ConnectionComponent,
    Validation1Component,
    UpdateUserDialogComponent  ],
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
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [Validation1Service, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
