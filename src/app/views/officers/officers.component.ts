import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';

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
    AddOfficerDialogComponent,
    RouterLink
  ],
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.scss']
})
export class OfficersComponent implements OnInit {
  userId: string | null = null;
  officers: any[] = [];

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadReports();
  }

  logout(): void {
    this.authService.logout();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (reports: ReportDto[]) => {
        this.officers = reports.map(report => ({
          ...this.parseOfficer(report.description),
          userId: report.userId,
          createdAt: report.createdAt
        }));
      },
      error: err => console.error('Failed to load reports', err)
    });
  }

  addOfficer(): void {
    const dialogRef = this.dialog.open(AddOfficerDialogComponent, {
      width: '400px',
      data: { name: '', age: null, crime: '', involved: '', image: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const report: ReportDto = {
          title: 'Arrest Report',
          description: `${result.name}, ${result.age} | Crime: ${result.crime} | Involved Officers: ${result.involved}`,
          departmentId: 1,
          userId: this.userId,
          createdAt: new Date().toISOString()
        };

        this.reportService.createReport(report).subscribe({
          next: () => this.loadReports(), // ✅ Refresh list to stay up to date
          error: err => console.error('Failed to save report', err)
        });
      }
    });
  }

  private parseOfficer(description: string): any {
    const match = description.match(/^(.+?), (\d+).*Crime: (.*?) \| Involved Officers: (.*)$/);
    return {
      name: match?.[1] ?? 'Unknown',
      age: Number(match?.[2]) || 0,
      crime: match?.[3] ?? 'Unknown',
      involved: match?.[4] ?? '',
      image: 'assets/mugshots/default.jpg'
    };
  }
}
