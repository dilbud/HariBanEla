import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../data/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = environment.baseUrl + 'tag';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  public createTag(data: string) {
    if (data === '') {
      this.alertService.setAlert('Can not set empty tag');
      this.alertService.showAlert();
      return;
    }
    let res: any;
    this.http.post(this.apiUrl + '/create', { value: data }).subscribe(
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

  public updateTags(idVal: string, valueVal: string) {
    if (valueVal === '') {
      this.alertService.setAlert('Can not set empty tag');
      this.alertService.showAlert();
      return;
    }
    let res: any;
    this.http.post(this.apiUrl + '/update', { id: idVal, value: valueVal }).subscribe(
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

  public getAllTags() {
    return this.http.get(this.apiUrl + '/getalltag');
  }
}
