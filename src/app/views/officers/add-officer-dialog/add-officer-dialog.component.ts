import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/auth.service'; // ✅ Add this import

@Component({
  selector: 'app-add-officer-dialog',
  standalone: true,
  templateUrl: './add-officer-dialog.component.html',
  styleUrls: ['./add-officer-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddOfficerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddOfficerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService // ✅ Inject AuthService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Could not determine user ID');
      return;
    }

    const updatedData = {
      ...this.data,
      userId: userId // ✅ Attach user ID
    };

    this.dialogRef.close(updatedData);
  }
}
