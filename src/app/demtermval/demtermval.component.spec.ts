import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemtermvalComponent } from './demtermval.component';

describe('DemtermvalComponent', () => {
  let component: DemtermvalComponent;
  let fixture: ComponentFixture<DemtermvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemtermvalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemtermvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
