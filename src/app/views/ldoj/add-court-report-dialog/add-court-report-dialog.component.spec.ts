import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourtReportDialogComponent } from './add-court-report-dialog.component';

describe('AddCourtReportDialogComponent', () => {
  let component: AddCourtReportDialogComponent;
  let fixture: ComponentFixture<AddCourtReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourtReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourtReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
