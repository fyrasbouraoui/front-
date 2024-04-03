import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';
import { tap } from 'rxjs/operators'; 
import { RegisterRequest } from '../interface/registerrequest.model';
import {AuthenticationResponse} from '../interface/authenticationresponse.model'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(request: RegisterRequest, profileName: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register?profileName=${profileName}`, request);
  }
  
  updateUser(idUser: number, userData: any) {
    return this.http.put(`${this.baseUrl}/${idUser}`, userData);
  }
  

  deleteUser(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idUser}`);
  }
  
  authenticate(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, { email, password }).pipe(
      tap((response) => {
        if (response && response.token && response.nomProfil) {
          localStorage.setItem(this.authTokenKey, response.token);
          // Store user's profile name
          localStorage.setItem('user_profile', response.nomProfil);
        } else {
          // Handle the case where the response, token, or profile name is missing
          console.error('Token or profile name is missing in the response');
        }
      })
    );
  }
  

  logout(): Observable<string> {
    // Remove the authentication token from localStorage
    localStorage.removeItem(this.authTokenKey);
    // Specify responseType as 'text'
    return this.http.post<string>(`${this.baseUrl}/logout`, null, { responseType: 'text' as 'json' });
  }
  getToken(): string | null {
    // Retrieve the authentication token from localStorage
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying the presence of the authentication token
    return !!this.getToken();
  }
  setUserInfo(userId: number, profileId: number, structureId: number): void {
    const userInfo = { userId, profileId, structureId };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(): { prenom: string,email: string, idUser: number, profileId: number, profileName: string, structureId: number, token: string } | null {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }
  getUserId(): number | null {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo.userId;
    } else {
      return null;
    }
  }
}
