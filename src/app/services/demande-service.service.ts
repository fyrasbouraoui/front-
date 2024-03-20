import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DemandeServiceService {
  private baseUrl = 'http://localhost:8080'; // Adjust the base URL as needed

  constructor(private _http: HttpClient) {}
  

  addDemande(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/demandes', data);
  }
  getDemande(): Observable<any> {
    return this._http.get('http://localhost:8080/demandes');
  }
  validateDemande(userId: number, structureId: number, profilId: number, demandeId: number): Observable<any> {
    const url = `http://localhost:8080/demandes/validation?userId=${userId}&structureId=${structureId}&profilId=${profilId}&Idemande=${demandeId}`;
    return this._http.post(url, {});
  }
  createDemande(demande: any, structureId: number, userId: number, profilId: number): Observable<any> {
    const url = `${this.baseUrl}/demandes`;
    return this._http.post(url, demande, {
      params: {
        structureId: structureId.toString(),
        userId: userId.toString(),
        profilId: profilId.toString()
      }
    });
  }
  deleteDemande(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/demandes/${id}`);
  }
}



