import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowuserdetailComponent } from './showuserdetail.component';

describe('ShowuserdetailComponent', () => {
  let component: ShowuserdetailComponent;
  let fixture: ComponentFixture<ShowuserdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowuserdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowuserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
