import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportDto } from '../models/report.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = 'http://localhost:9090/api/reports'; // Adjust if different

  constructor(private http: HttpClient) {}

  createReport(report: ReportDto) {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  return this.http.post(this.apiUrl, report, { headers });
  }

  // Optional: for listing reports
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
