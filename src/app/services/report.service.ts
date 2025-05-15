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
    const token = this.authService.getToken(); // ✅ Make sure this works
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getReports(): Observable<ReportDto[]> {
    return this.http.get<ReportDto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createReport(report: ReportDto): Observable<ReportDto> {
    return this.http.post<ReportDto>(this.apiUrl, report, { headers: this.getHeaders() });
  }
}
