import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowApiDetailComponent } from './show-api-detail.component';

describe('ShowApiDetailComponent', () => {
  let component: ShowApiDetailComponent;
  let fixture: ComponentFixture<ShowApiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowApiDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowApiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
