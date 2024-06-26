import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListestructureComponent } from './listestructure.component';

describe('ListestructureComponent', () => {
  let component: ListestructureComponent;
  let fixture: ComponentFixture<ListestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListestructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
