import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserData } from '../models/userData';
import { ServerData } from '../models/serverData';
import { AuthData } from '../models/authData';
import { AlertService } from './alert.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isAuthenticated = false;
  private token: string = null;
  private tokenTimer: any;
  private userType = 0; // public 0 general 1 professional 2 admin 3
  private authStatusListener = new Subject<boolean>();
  private serverData: ServerData;
  private userData: UserData;

  private socialData = {
    provider: String,
    firstName: String,
    lastName: String,
    email: String
  };

  constructor(
    private authService: AuthService,
    // tslint:disable-next-line: no-shadowed-variable
    private AlertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {}

  public getServerToken(): any {
    const token101 = this.getToken('token101');
    const token202 = this.getToken('token202');
    let obj = { token101: JSON, token202: JSON };
    obj = { token101, token202 };
    return obj;
  }

  getIsAuth(): any {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // -------------------------------------------------------- signup begin
  // create user
  public updateUser(data: UserData) {
    console.log('+++++++++++++');
    console.log(this.serverData);
    let server;
    this.http.post('http://localhost:3000/api/user/update', {id: 'jjg' , query: data}).subscribe(
      response => {
        server = response;
      },
      error => {
        this.AlertService.setAlert('Something wrong !');
        this.AlertService.showAlert();
      },
      () => {
        this.serverData = {
          id: server._id,
          firstName: server.firstName,
          lastName: server.lastName,
          address: server.address,
          email: server.email,
          picURL: server.picURL,
          userType: server.serType
        };
        this.userData = {
          firstName: this.serverData.firstName,
          lastName: this.serverData.lastName,
          address: this.serverData.address,
          email: this.serverData.email,
          password: '********',
          picURL: this.serverData.picURL,
          userType: this.serverData.userType
        };
        console.log(this.serverData);
        this.router.navigate(['/']);
        this.AlertService.setAlert(
          'Hi ' + data.firstName + ' your account is updated'
        );
        this.AlertService.showAlert();
      }
    );
  }
  // -------------------------------------------------------- signup end
  // -------------------------------------------------------- login start
  public google() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      const data = this.fetchSocialData();
      this.storeToken('token202', data);
      const token101 = this.getToken('token101');
      const token202 = this.getToken('token202');
      this.userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: 'null',
        email: data.email,
        password: '****',
        picURL: data.photoUrl,
        userType: 'user'
      };
      console.log(this.userData);
      let res: any;
      this.http
        .post('http://localhost:3000/api/user/create', this.userData)
        .subscribe(
          response => {
            res = response;
          },
          error => {
            this.AlertService.setAlert('Something wrong !');
            this.AlertService.showAlert();
          },
          () => {
            console.log('hhhhhhhvvvvvv');
            this.serverData = {
              id: res.id,
              firstName: res.firstName,
              lastName: res.lastName,
              address: res.address,
              email: res.email,
              picURL: res.picURL,
              userType: res.picURL
            };
            this.userData = {
              firstName: this.serverData.firstName,
              lastName: this.serverData.lastName,
              address: this.serverData.address,
              email: this.serverData.email,
              password: '****',
              picURL: this.serverData.picURL,
              userType: this.serverData.picURL
            };
            // this.router.navigate(['/']);
            this.AlertService.setAlert(
              'Hi ' + data.name + ' your account is created'
            );
            this.AlertService.showAlert();
          }
        );
    });
  }

  public facebook() {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  fetchSocialData() {
    let userData: any;
    this.authService.authState.subscribe(user => {
      userData = user;
    });
    return userData;
  }

  public login(email: string, password: string) {
    const authData: AuthData = { email, password };
    console.log(authData);
    let res: any;
    this.http.post('http://localhost:3000/api/user/login', authData).subscribe(
      response => {
        res = response;
      },
      error => {
        console.log(error.error);
        this.AlertService.setAlert(error.error.msg);
        this.AlertService.showAlert();
      },
      () => {
        this.serverData = res.user;
        console.log(res.user);
        this.storeToken('token101', res.tokenData);
        this.setAuthTimer();
        this.isAuthenticated = true;
        this.AlertService.setAlert('you\'re welcome');
        this.AlertService.showAlert();
        // this.router.navigate(['/']);
      }
    );
  }
  // -------------------------------------------------------- login end

  public autoAuthUser() {}

  logout() {
    this.authService.signOut();
    this.userType = 0;
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer() {
    const data = this.getToken('token101');
    console.log('77777777777777');
    console.log(data);
    const iat = data.iat;
    const exp = data.exp;
    const now = new Date().getTime();
    const duration = exp * 1000 - now;
    const bool = iat * 1000 <= now && now < exp * 1000;
    if (bool) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration);
    } else {
      this.logout();
    }
  }

  private storeToken(tokenName: string, data: JSON) {
    localStorage.setItem(tokenName, JSON.stringify(data));
  }

  public getToken(tokenName: string) {
    if (tokenName === 'token101') {
      const localStorageServerTokenData = localStorage.getItem(tokenName);
      if (localStorageServerTokenData) {
        return JSON.parse(localStorageServerTokenData);
      } else {
        return null;
      }
    }
    if (tokenName === 'token202') {
      const localStorageSocialTokenData = localStorage.getItem(tokenName);
      console.log(localStorageSocialTokenData);
      if (localStorageSocialTokenData) {
        return JSON.parse(localStorageSocialTokenData);
      } else {
        return null;
      }
    }
    return null;
  }

  private clearAuthData() {
    localStorage.removeItem('token101');
    localStorage.removeItem('token202');
  }

}
