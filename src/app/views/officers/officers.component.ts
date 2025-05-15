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

export type FullReport = ReportDto & { id: number; officerInfo: any };

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
  reports: FullReport[] = [];

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
      next: (reports) => {
        console.log('Fetched reports:', reports);
        this.reports = reports.map((report) => ({
          ...report,
          officerInfo: this.parseOfficer(report.description)
        })) as FullReport[];
      },
      error: (err) => console.error('Failed to load reports', err)
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
          next: (saved: ReportDto & { id: number }) => {
            const fullReport: FullReport = {
              ...saved,
              officerInfo: this.parseOfficer(saved.description)
            };
            this.reports.push(fullReport);
          },
          error: (err) => console.error('Failed to save report', err)
        });
      }
    });
  }

  editReport(report: FullReport): void {
    const updatedReport: ReportDto = {
      title: 'Updated Arrest Report',
      description: report.description,
      departmentId: report.departmentId,
      userId: report.userId,
      createdAt: new Date().toISOString()
    };

    this.reportService.updateReport(report.id, updatedReport).subscribe({
      next: () => this.loadReports(),
      error: (err) => console.error('Failed to update report', err)
    });
  }

  deleteReport(reportId: number): void {
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        this.reports = this.reports.filter(r => r.id !== reportId);
      },
      error: (err) => console.error('Failed to delete report', err)
    });
  }

  parseOfficer(description: string): any {
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