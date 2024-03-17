import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  private idUser: number | null = null;
  private profilId: number | null = null;
  private structureId: number | null = null;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }
  
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idUser}`);
  }
  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { email, password });
  }
  logout(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/logout`);
  }
  setUserInfo(userId: number, profilId: number, structureId: number): void {
    this.idUser = userId;
    this.profilId = profilId;
    this.structureId = structureId;
  }

  getUserInfo(): { userId: number | null, profilId: number | null, structureId: number | null } {
    return { userId: this.idUser ?? null, profilId: this.profilId ?? null, structureId: this.structureId ?? null };
  }
}
