import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-court-report-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './add-court-report-dialog.component.html',
  styleUrls: ['./add-court-report-dialog.component.scss']
})
export class AddCourtReportDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCourtReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      caseName: string;
      date: string;
      judge: string;
      defendant: string;
      caseDescription: string;
    }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}

