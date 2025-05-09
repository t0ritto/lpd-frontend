import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ReportService } from '../../services/report.service';
import { AddOfficerDialogComponent } from './add-officer-dialog/add-officer-dialog.component';
import { ReportDto } from '../../models/report.dto';

@Component({
  selector: 'app-officers',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    AddOfficerDialogComponent
  ],
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  officers = [
    {
      name: 'John Doe',
      age: 32,
      crime: 'Theft',
      involved: 'Officer A, Officer B',
      image: 'assets/mugshots/john.jpg'
    },
    {
      name: 'Jane Smith',
      age: 29,
      crime: 'Fraud',
      involved: 'Officer C',
      image: 'assets/mugshots/jane.jpg'
    }
  ];

  logout(): void {
    this.authService.logout();
  }

  addOfficer(): void {
    const dialogRef = this.dialog.open(AddOfficerDialogComponent, {
      width: '400px',
      data: { name: '', age: null, crime: '', involved: '', image: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.officers.push(result);

        const report: ReportDto = {
          title: 'Arrest Report',
          description: `${result.name}, ${result.age} | Crime: ${result.crime} | Involved Officers: ${result.involved}`,
          departmentId: 1, // Adjust based on the department logic
          userId: this.authService.getUserId() // This must return a numeric user ID
        };

        this.reportService.createReport(report).subscribe({
          next: () => console.log('Report saved'),
          error: err => console.error('Failed to save report', err)
        });
      }
    });
  }
}
