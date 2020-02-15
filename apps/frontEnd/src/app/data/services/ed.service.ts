import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../data/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class EdService {

  private apiUrl = environment.baseUrl + 'ed';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  public enableUser(data: string) {
    let res: any;
    this.http.post(this.apiUrl + '/activeUser', {id: data}).subscribe(
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

  public disableUser(data: string) {
    let res: any;
    this.http.post(this.apiUrl + '/deactivateUser', {id: data}).subscribe(
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
