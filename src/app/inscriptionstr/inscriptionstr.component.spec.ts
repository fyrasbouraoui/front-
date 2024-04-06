import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionstrComponent } from './inscriptionstr.component';

describe('InscriptionstrComponent', () => {
  let component: InscriptionstrComponent;
  let fixture: ComponentFixture<InscriptionstrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionstrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
