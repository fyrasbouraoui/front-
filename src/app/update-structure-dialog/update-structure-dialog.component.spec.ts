import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStructureDialogComponent } from './update-structure-dialog.component';

describe('UpdateStructureDialogComponent', () => {
  let component: UpdateStructureDialogComponent;
  let fixture: ComponentFixture<UpdateStructureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStructureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStructureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
