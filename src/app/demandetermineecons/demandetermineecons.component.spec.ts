import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandetermineeconsComponent } from './demandetermineecons.component';

describe('DemandetermineeconsComponent', () => {
  let component: DemandetermineeconsComponent;
  let fixture: ComponentFixture<DemandetermineeconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandetermineeconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandetermineeconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
