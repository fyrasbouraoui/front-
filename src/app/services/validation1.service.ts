import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Validation1Service {
  private rowDataSubject = new BehaviorSubject<any>(null);
  rowData$ = this.rowDataSubject.asObservable();

  constructor() {}

  sendRowData(rowData: any) {
    this.rowDataSubject.next(rowData);
  }
}