import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedemandeconsommateurComponent } from './listedemandeconsommateur.component';

describe('ListedemandeconsommateurComponent', () => {
  let component: ListedemandeconsommateurComponent;
  let fixture: ComponentFixture<ListedemandeconsommateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListedemandeconsommateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListedemandeconsommateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
