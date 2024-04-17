import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeapiconsComponent } from './listeapicons.component';

describe('ListeapiconsComponent', () => {
  let component: ListeapiconsComponent;
  let fixture: ComponentFixture<ListeapiconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeapiconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeapiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
