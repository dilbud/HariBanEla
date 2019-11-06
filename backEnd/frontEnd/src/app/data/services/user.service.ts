import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserData } from '../models/userData';
import { AlertService } from './alert.service';

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
    private AlertService: AlertService ,
    private http: HttpClient,
    private router: Router) {}

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
  createAdmin(data: UserData) {
    console.log(data.email + ' xx ' + data.password);
    this.http
      .post('http://localhost:3000/api/user/signup', data)
      .subscribe(response => {
        console.log(response);
        this.AlertService.setAlert(data.firstName + 'user created');
        this.router.navigate(['/']);
      });
  }
  // create General
  createGeneral(data: UserData) {
    console.log(data.email + ' xx ' + data.password);
    this.http
      .post('http://localhost:3000/api/user/signup', data)
      .subscribe(response => {
        console.log(response);
        this.AlertService.setAlert("user created");
        this.router.navigate(['/']);
      });
  }
    // create professional
    createProfessional(data: UserData) {
      console.log(data.email + ' xx ' + data.password);
      this.http
        .post('http://localhost:3000/api/user/signup', data)
        .subscribe(response => {
          console.log(response);
          this.AlertService.setAlert("user created");
          this.router.navigate(['/']);
        });
    }
  // -------------------------------------------------------- signup end



  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.get('http://localhost:3000/api/user/key').subscribe(response => {
      console.dir(response);
    });
    this.http
      .post('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

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
