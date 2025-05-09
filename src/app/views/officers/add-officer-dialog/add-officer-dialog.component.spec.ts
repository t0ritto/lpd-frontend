import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficerDialogComponent } from './add-officer-dialog.component';

describe('AddOfficerDialogComponent', () => {
  let component: AddOfficerDialogComponent;
  let fixture: ComponentFixture<AddOfficerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfficerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
