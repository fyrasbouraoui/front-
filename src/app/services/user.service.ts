import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private idUser: number | null = null;
  private profilId: number | null = null;
  private structureId: number | null = null;
  private authTokenKey = 'auth_token';

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
  
  updateUser(idUser: number, userData: any) {
    return this.http.put(`${this.baseUrl}/${idUser}`, userData);
  }
  

  deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idUser}`);
  }
  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/authenticate`, { email, password }).pipe(
      tap((response: User | undefined) => {
        if (response && response.token) {
          localStorage.setItem(this.authTokenKey, response.token);
        } else {
          // Handle the case where the response or token is undefined
          console.error('Response or token is undefined');
        }
      }) as any // Type assertion
    );
  }

  logout(): Observable<string> {
    // Remove the authentication token from localStorage
    localStorage.removeItem(this.authTokenKey);
    return this.http.delete<string>(`${this.baseUrl}/logout`);
  }

  getToken(): string | null {
    // Retrieve the authentication token from localStorage
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying the presence of the authentication token
    return !!this.getToken();
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
