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
import { RouterLink } from '@angular/router';
import { ReportDto } from '../../models/report.dto';
import { AuthService } from '../../auth/auth.service';
import { ReportService } from '../../services/report.service';
import { AddCourtReportDialogComponent } from './add-court-report-dialog/add-court-report-dialog.component';

export type FullCourtReport = ReportDto & { id: number; courtInfo?: any };

@Component({
  selector: 'app-ldoj',
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
    RouterLink,
    AddCourtReportDialogComponent
  ],
  templateUrl: './ldoj.component.html',
  styleUrls: ['./ldoj.component.scss']
})
export class LdojComponent implements OnInit {
  userKeycloakId: string | null = null;
  reports: FullCourtReport[] = [];

  constructor(
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userKeycloakId = this.authService.getUserId();
    this.loadReports();
  }

  logout(): void {
    this.authService.logout();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports
          .filter((r): r is FullCourtReport => typeof r.id === 'number' && r.departmentId === 3)
          .map((report) => ({
            ...report,
            courtInfo: this.parseCourtInfo(report.description)
          }));
      },
      error: (err) => console.error('Failed to load reports', err)
    });
  }
  
  parseCourtInfo(description: string): any {
    const match = description.match(/^Case: (.*?) \| Date: (.*?) \| Judge: (.*?) \| Defendant: (.*?) \| Details: (.*)$/);
    return {
      caseName: match?.[1] ?? '',
      date: match?.[2] ?? '',
      judge: match?.[3] ?? '',
      defendant: match?.[4] ?? '',
      details: match?.[5] ?? ''
    };
  }

  canEditOrDelete(report: FullCourtReport): boolean {
    return report.userKeycloakId === this.userKeycloakId;
  }

  addReport(): void {
    const dialogRef = this.dialog.open(AddCourtReportDialogComponent, {
      width: '400px',
      data: {
        caseName: '',
        date: '',
        judge: '',
        defendant: '',
        caseDescription: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const report: ReportDto = {
          title: 'Court Report',
          description: `Case: ${result.caseName} | Date: ${result.date} | Judge: ${result.judge} | Defendant: ${result.defendant} | Details: ${result.caseDescription}`,
          departmentId: 2,
          userKeycloakId: this.userKeycloakId!,
          createdAt: new Date().toISOString()
        };

        this.reportService.createReport(report).subscribe({
          next: (saved: FullCourtReport) => {
            this.reports.push({
              ...saved,
              courtInfo: this.parseCourtInfo(saved.description)
            });
          },
          error: (err) => console.error('Failed to save court report', err)
        });
      }
    });
  }

  editReport(report: FullCourtReport): void {
    // Placeholder for future edit logic
    console.log('Edit feature not implemented yet', report);
  }
  
  deleteReport(reportId: number): void {
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        this.reports = this.reports.filter(r => r.id !== reportId);
      },
      error: (err) => console.error('Failed to delete court report', err)
    });
  }
}
