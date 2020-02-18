import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { ReportData } from '../../data/models/reportData';
import { AlertService } from '../../data/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = environment.baseUrl + 'report';
  constructor(private http: HttpClient, private alertService: AlertService) {}

  public sendFeedBack(data: ReportData) {
    let res: any;
    this.http.post(this.apiUrl + '/setfeedback', data).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }
  public getFeedBack() {
    return this.http.get(this.apiUrl + '/getfeedback');
  }

  public deleteFeedBack(data: any) {
    let res: any;
    this.http.post(this.apiUrl + '/deletefeedback', { id: data }).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }

  public sendResetPassword(data: ReportData) {
    let res: any;
    this.http.post(this.apiUrl + '/resetPassword', data).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }

  public sendReportUser(data: ReportData) {
    let res: any;
    this.http.post(this.apiUrl + '/reportUser', data).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }

  public getReportUser() {
    return this.http.get(this.apiUrl + '/getReportUser');
  }

  public sendReportPost(data: ReportData) {
    let res: any;
    this.http.post(this.apiUrl + '/reportPost', data).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }
  public getReportPost() {
    return this.http.get(this.apiUrl + '/getReportPost');
  }

  deleteReportPost(val: any) {
    let res: any;
    this.http.post(this.apiUrl + '/deleteReportPost', { id: val }).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }


  deleteReportUser(val: any) {
    let res: any;
    this.http.post(this.apiUrl + '/deleteReportUser', { id: val }).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.alertService.setAlert(res.msg);
        this.alertService.showAlert();
      }
    );
  }
}
