import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerdemandeComponent } from './gerdemande.component';

describe('GerdemandeComponent', () => {
  let component: GerdemandeComponent;
  let fixture: ComponentFixture<GerdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerdemandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
