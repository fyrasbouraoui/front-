import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/apis';

  constructor(private httpClient: HttpClient) {}

  getAllApis(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getApiById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  createApi(apiData: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, apiData);
  }

  updateApi(id: number, apiData: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, apiData);
  }

  deleteApi(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
