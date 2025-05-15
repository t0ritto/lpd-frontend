import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportDto } from '../models/report.dto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = 'http://localhost:9090/api/reports';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getReports(): Observable<ReportDto[]> {
    return this.http.get<ReportDto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  
  createReport(report: ReportDto): Observable<ReportDto & { id: number }> {
  return this.http.post<ReportDto & { id: number }>(this.apiUrl, report, { headers: this.getHeaders() });
  }

  updateReport(reportId: number, updatedReport: ReportDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${reportId}`, updatedReport, { headers: this.getHeaders() });
  }

  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reportId}`, { headers: this.getHeaders() });
  }
}
