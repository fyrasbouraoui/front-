import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Validation1Component } from './validation1.component';

describe('Validation1Component', () => {
  let component: Validation1Component;
  let fixture: ComponentFixture<Validation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Validation1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Validation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
