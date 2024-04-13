import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandeDetailComponent } from './show-demande-detail.component';

describe('ShowDemandeDetailComponent', () => {
  let component: ShowDemandeDetailComponent;
  let fixture: ComponentFixture<ShowDemandeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDemandeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDemandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
