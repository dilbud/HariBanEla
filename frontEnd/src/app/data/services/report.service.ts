import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { ReportData } from '../../data/models/reportData';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.baseUrl + 'report';
  constructor(
    private http: HttpClient,
  ) { }

  public sendFeedBack(data: ReportData) {
    this.http.post(this.apiUrl + '/feedback', data).subscribe(
      response => {
      },
      error => {
      },
      () => {
      }
    );
  }

  public sendResetPassword(data: ReportData) {
    this.http.post(this.apiUrl + '/resetPassword', data).subscribe(
      response => {
      },
      error => {
      },
      () => {
      }
    );
  }

  public sendReportUser(data: ReportData) {
    this.http.post(this.apiUrl + '/reportUser', data).subscribe(
      response => {
      },
      error => {
      },
      () => {
      }
    );
  }

  public sendReportPost(data: ReportData) {
    this.http.post(this.apiUrl + '/reportPost', data).subscribe(
      response => {
      },
      error => {
      },
      () => {
      }
    );
  }
}
