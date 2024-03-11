import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Validation1Service {

  private selectedDataSubject = new BehaviorSubject<any>(null);
  selectedData$: Observable<any> = this.selectedDataSubject.asObservable();

  setSelectedData(data: any) {
    console.log('Data emitted from Validation1Service:', data);
    this.selectedDataSubject.next(data);
  }
  getSelectedData(): Observable<any> {
    return this.selectedData$;
  }
}
