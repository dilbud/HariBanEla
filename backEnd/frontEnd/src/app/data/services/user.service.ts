import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserData } from '../models/userData';
import { AlertService } from './alert.service';
import { stringify } from 'querystring';

export interface AuthData {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private AlertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // -------------------------------------------------------- signup begin
  // create Admin
  public createAdmin(data: UserData) {
    console.log(data.email + ' xx ' + data.password);

    this.http.post('http://localhost:3000/api/user/signup', data, { params: { type: 'admin' } }).subscribe(
      response => {},
      error => {
        this.AlertService.setAlert('Something wrong !');
        this.AlertService.showAlert();
      },
      () => {
        this.router.navigate(['/']);
        this.AlertService.setAlert(
          'Hi ' + data.firstName + ' your account is created'
        );
        this.AlertService.setAlert('please login');
        this.AlertService.showAlert();
      }
    );
  }
  // create General
  public createGeneral(data: UserData) {
    console.log(data.email + ' xx ' + data.password);
    this.http
      .post('http://localhost:3000/api/user/signup', data, { params: { type: 'general' } })
      .subscribe(response => {
        console.log(response);
        this.AlertService.setAlert('user created');
        this.router.navigate(['/']);
      });
  }
  // create professional
  public createProfessional(data: UserData) {
    console.log(data.email + ' xx ' + data.password);
    this.http
    .post('http://localhost:3000/api/user/signup', data, { params: { type: 'professional' } })
      .subscribe(response => {
        // console.log(response);
        this.AlertService.setAlert('user created');
        this.router.navigate(['/']);
      }, error => {
        console.log(fggggggggggggggggggggggggggggggggggggggggggggggggggg);
      });
  }
  // -------------------------------------------------------- signup end
  // -------------------------------------------------------- login start
  public login(email: string, password: string) {
    const authData: AuthData = { email, password };
    let data: any = {};
    let payload: any = {
      userId: Number
    };
    let storageData: any = {
      firstName: String,
      lastName: String,
      payload,
      token: String,
      exp: Number
    };

    this.http
      .post('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
        data = response;
        console.log(data);
      },(error) => {
        console.log(error.error);
        this.AlertService.setAlert(error.error.msg);
        this.AlertService.showAlert();
      }, () => {
        this.AlertService.setAlert('you\'re welcome');
        this.AlertService.showAlert();
        this.router.navigate(['/']);
      });
  }
  // -------------------------------------------------------- login end

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
