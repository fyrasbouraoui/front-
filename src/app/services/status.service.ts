import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseUrl = 'http://localhost:8080/status'; // Replace this with your backend API URL

  constructor(private http: HttpClient) {}

  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }

  getStatusById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.baseUrl}/${id}`);
  }

  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.baseUrl, status);
  }

  updateStatus(id: number, status: Status): Observable<Status> {
    // Assuming your API endpoint for updating status is 'api/updateStatus/{id}'
    return this.http.put<Status>(`${this.baseUrl}/${id}`, status);
  }

  deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStatusByDemandeId(idDemande: number): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/demande/${idDemande}`);
  }
}
