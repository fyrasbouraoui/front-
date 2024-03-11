// prmiere-validation.component.ts
import { Component, OnInit } from '@angular/core';
import { Validation1Service } from '../services/validation1.service';

@Component({
  selector: 'app-prmiere-validation',
  templateUrl: './prmierevalidation.component.html',
  styleUrls: ['./prmierevalidation.component.scss'],
})
export class PrmiereValidationComponent implements OnInit {
  displayedColumns: string[] = ['description', 'nomApp', 'action'];
  selectedData: any;

  constructor(private validation1Service: Validation1Service) {}

  ngOnInit(): void {
    this.validation1Service.getSelectedData().subscribe((data) => {
      this.selectedData = data;
    });
  }
}
