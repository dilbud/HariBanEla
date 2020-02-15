import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../data/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyProService {

  private apiUrl = environment.baseUrl + 'verifypro';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  public acceptPro(data: string) {
    let res: any;
    this.http.post(this.apiUrl + '/accept', {id: data}).subscribe(
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

  public rejectPro(data: string) {
    let res: any;
    this.http.post(this.apiUrl + '/reject', {id: data}).subscribe(
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
