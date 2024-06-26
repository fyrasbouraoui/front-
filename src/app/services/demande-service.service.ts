import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Demande } from '../interface/demande.model';
@Injectable({
  providedIn: 'root'
})

export class DemandeServiceService {
  private baseUrl = 'http://localhost:8080/demande'; // Adjust this URL to match your backend API endpoint

  constructor(private _http: HttpClient) {}
  

  addDemande(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/api/v1', data);
  }
  getAllDemandes(): Observable<Demande[]> {
    return this._http.get<Demande[]>(this.baseUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching demandes:', error);
        return throwError('Error fetching demandes: ' + error.message);
      })
    );
  }
  getDemande(): Observable<any> {
    return this._http.get(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
        console.error('Error fetching demandes:', error);
        return throwError('Error fetching demandes: ' + error.message);
      })
    );
  }
  getAllDemandesByUserId(userId: number): Observable<Demande[]> {
    return this._http.get<Demande[]>(`${this.baseUrl}/user/${userId}`);
  }
  getDemandeById(id: number): Observable<Demande> {
    return this._http.get<Demande>(`${this.baseUrl}/${id}`);
  }
  validateDemande(id: number, userId: number): Observable<string> {
    return this._http.post<string>(`${this.baseUrl}/${id}/validation?userId=${userId}`, {});
  }
  rejectDemande(demandeId: number, userId: number, reason: string): Observable<string> {
    const params = new HttpParams()
      .set('demandeId', demandeId.toString())
      .set('userId', userId.toString());
    return this._http.post<string>(`${this.baseUrl}/rejectDemande`, reason, { params }).pipe(
      catchError((error: any) => {
        console.error('Error rejecting demande:', error);
        return throwError('Error rejecting demande: ' + error.message);
      })
    );
  }
  rectifyDemande(demandeId: number, userId: number, rectificationMessage: string): Observable<string> {
    const params = new HttpParams()
      .set('demandeId', demandeId.toString())
      .set('userId', userId.toString());
    return this._http.post<string>(`${this.baseUrl}/rectifyDemande`, rectificationMessage, { params }).pipe(
      catchError((error: any) => {
        console.error('Error rectifying demande:', error);
        return throwError('Error rectifying demande: ' + error.message);
      })
    );
  }
  createDemande(demande: any, structureId: number | null, userId: number | null, profileId: number | null, apiId:number): Observable<any> {
    console.log('structureId:', structureId);
    console.log('userId:', userId);
    console.log('profilId:', profileId);
    console.log('apiId', apiId);

  
      return this._http.post<Demande>(`${this.baseUrl}/create?structureId=${structureId}&userId=${userId}&profilId=${profileId}&apiId=${apiId}`, demande);
    }
  
  
  
  deleteDemande(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  updateAndValidateDemand(id: number, demande: any): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/${id}/validation`, demande);
  }
  getDemandesByStatus(nomStatus: string): Observable<Demande[]> {
    return this._http.get<Demande[]>(`${this.baseUrl}/status?nomStatus=${nomStatus}`);
  }
}



