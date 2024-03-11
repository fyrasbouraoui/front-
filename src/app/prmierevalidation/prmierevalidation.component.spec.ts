import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmierevalidationComponent } from './prmierevalidation.component';

describe('PrmierevalidationComponent', () => {
  let component: PrmierevalidationComponent;
  let fixture: ComponentFixture<PrmierevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrmierevalidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrmierevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
