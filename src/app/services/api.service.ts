import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  addApi(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/apis', data);
  }
  getApis(): Observable<any> {
    return this._http.get('http://localhost:8080/apis');
  }
}
