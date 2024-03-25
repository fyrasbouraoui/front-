import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profil } from '../interface/profil.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/profils';

  constructor(private http: HttpClient) { }

  getAllProfiles(): Observable<Profil[]> {
    return this.http.get<Profil[]>(this.baseUrl);
  }

  getProfileById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.baseUrl}/${id}`);
  }

  createProfile(profile: Profil): Observable<Profil> {
    return this.http.post<Profil>(this.baseUrl, profile);
  }

  updateProfile(id: number, profile: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.baseUrl}/${id}`, profile);
  }

  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  

  // You can implement additional methods as needed, such as searching profiles by name or code.
}
