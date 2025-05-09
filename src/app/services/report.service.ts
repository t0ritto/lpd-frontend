import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportDto } from '../models/report.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = 'http://localhost:9090/api/reports'; // Adjust if different

  constructor(private http: HttpClient) {}

  createReport(report: ReportDto): Observable<any> {
    return this.http.post(this.apiUrl, report);
  }

  // Optional: for listing reports
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
