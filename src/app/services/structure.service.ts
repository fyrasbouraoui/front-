// src/app/services/structure.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Structure } from '../interface/structure.model';
import { AuthenticationResponse } from '../interface/authenticationresponse.model'; // Import AuthenticationResponse if needed
import { RegisterStructureRequest } from '../interface/registerstructurerequest.model';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  private baseUrl = 'http://localhost:8080/structures'; // Adjust if your base URL differs
  private baseUr = 'http://localhost:8080/api/v1/auth'; // Update base URL to match the endpoint

  constructor(private http: HttpClient) {}
  registerStructure(request: RegisterStructureRequest, profileName: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUr}/registerStructure?profileName=${profileName}`, request);
  }
  getAllStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.baseUrl);
  }

  getStructureById(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.baseUrl}/${id}`);
  }

  addStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.baseUrl, structure);
  }

  updateStructure(id: number, structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(`${this.baseUrl}/${id}`, structure);
  }

  deleteStructure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  grantPrivilegesToRole(structureId: number, role: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${structureId}/grant-privileges/${role}`, null);
  }
}
