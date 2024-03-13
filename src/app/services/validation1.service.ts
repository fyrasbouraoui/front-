import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Validation1Service {
  private demandeDataSubject = new BehaviorSubject<any>(null);
  demandeData$ = this.demandeDataSubject.asObservable();

  setDemandeData(data: any) {
    this.demandeDataSubject.next(data);
  }
}