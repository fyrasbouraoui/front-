import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DemandeServiceService {
  constructor(private _http: HttpClient) {}
  

  addDemande(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/demandes', data);
  }
  getDemande(): Observable<any> {
    return this._http.get('http://localhost:8080/demandes');
  }
}



