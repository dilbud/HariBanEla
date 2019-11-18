import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
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
export class UserService  {

  private isAuthenticated = false;
  private token: string = null;
  private tokenTimer: any;
  private userType = 'pub'; // public pub general gen 1 professional pro 2 admin 3 admin
  private authStatusListener = new Subject<boolean>();
  private serverData: ServerData;
  private userData: UserData;
  private socialLoggedIn = false;
  private user = {
    id: String,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    picURL: String,
    userType: String
  };

  constructor(
    private authService: AuthService,
    // tslint:disable-next-line: no-shadowed-variable
    private AlertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.authService.authState.subscribe((user) => {
      this.socialLoggedIn = (user != null);
    });
  }

  public getIsAuth(): any {
    return this.isAuthenticated;
  }
  public getUserData(): any {
    return this.user;
  }

  public getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  // -------------------------------------------------------- update begin
  public updateUser(data: UserData) {
    let res: any;
    this.http
      .post('http://localhost:3000/api/user/update', {
        id: this.user.id,
        query: data
      })
      .subscribe(
        response => {
          res = response;
        },
        error => {
          this.AlertService.setAlert('Something wrong !');
          this.AlertService.setAlert(error.error.msg);
          this.AlertService.showAlert();
        },
        () => {
          this.user = res.serverData;
          this.token = res.token;
          this.storeToken(this.token);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.setAuthTimer();
          this.router.navigate(['/']);
          this.AlertService.setAlert(
            'Hi ' + data.firstName + ' your account is updated'
          );
          this.AlertService.showAlert();
        }
      );
  }
  // -------------------------------------------------------- update end
  // -------------------------------------------------------- login start
  public google() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        const data = this.fetchSocialData();
        this.serverData = {
          id: 'null',
          firstName: data.firstName,
          lastName: data.lastName,
          address: 'null',
          email: data.email,
          picURL: data.photoUrl,
          userType: 'gen'
        };
        let res: any;
        this.http
          .post('http://localhost:3000/api/user/create', this.serverData)
          .subscribe(
            response => {
              res = response;
            },
            error => {
              this.AlertService.setAlert('Something wrong !');
              this.AlertService.setAlert(error.error.msg);
              this.AlertService.showAlert();
            },
            () => {
              this.user = res.serverData;
              this.token = res.token;
              this.storeToken(this.token);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              this.setAuthTimer();
              if (res.msg === 'created') {
                this.AlertService.setAlert(
                  'Hi ' + data.name + ' your account is created'
                );
              }
              if (res.msg === 'exist') {
                this.AlertService.setAlert(
                  'Hi ' + data.name + ' your are sign in'
                );
              }
              console.log('+++++++++++++');
              console.log(this.user);
              this.AlertService.setAlert('Hi ' + data.name);
              this.AlertService.showAlert();
            }
          );
      })
      .catch(error => {
        console.log(error);
        this.AlertService.setAlert('Try later ...');
        this.AlertService.showAlert();
      });
  }

  public facebook() {
    this.authService
    .signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      const data = this.fetchSocialData();
      console.log('9----------------------------------------------------9');
      console.log(data);
      this.serverData = {
        id: 'null',
        firstName: data.firstName,
        lastName: data.lastName,
        address: 'null',
        email: data.email,
        picURL: data.photoUrl,
        userType: 'gen'
      };
      let res: any;
      this.http
        .post('http://localhost:3000/api/user/create', this.serverData)
        .subscribe(
          response => {
            res = response;
          },
          error => {
            this.AlertService.setAlert('Something wrong !');
            this.AlertService.setAlert(error.error.msg);
            this.AlertService.showAlert();
          },
          () => {
            this.user = res.serverData;
            this.token = res.token;
            this.storeToken(this.token);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.setAuthTimer();
            if (res.msg === 'created') {
              this.AlertService.setAlert(
                'Hi ' + data.name + ' your account is created'
              );
            }
            if (res.msg === 'exist') {
              this.AlertService.setAlert(
                'Hi ' + data.name + ' your are sign in'
              );
            }
            console.log('+++++++++++++');
            console.log(this.user);
            this.AlertService.setAlert('Hi ' + data.name);
            this.AlertService.showAlert();
          }
        );
    })
    .catch(error => {
      console.log(error);
      this.AlertService.setAlert('Try later ...');
      this.AlertService.showAlert();
    });
  }

  public login(email: string, password: string) {
    const authData: AuthData = { email, password };
    let res: any;
    this.http.post('http://localhost:3000/api/user/login', authData).subscribe(
      response => {
        res = response;
      },
      error => {
        this.AlertService.setAlert('Something wrong !');
        this.AlertService.setAlert(error.error.msg);
        this.AlertService.showAlert();
      },
      () => {
        this.user = res.serverData;
        this.token = res.token;
        this.storeToken(this.token);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setAuthTimer();
        this.AlertService.setAlert(
          'Hi ' +
            this.user.firstName +
            ' ' +
            this.user.lastName
        );
        console.log('+++++++++++++');
        console.log(this.user);
        this.AlertService.showAlert();
        // this.router.navigate(['/']);
      }
    );
  }
  // -------------------------------------------------------- login start
  private fetchSocialData() {
    let userData: any;
    this.authService.authState.subscribe(user => {
      userData = user;
    });
    return userData;
  }

  public autoAuthUser() {
    const token = this.getToken();
    const decoded = this.decodeToken(token);
    if (decoded === null || decoded === undefined) {
      this.logout();
      return;
    } else {
      console.log('auto auth user ************************');
      this.user = {
        id: decoded.id,
        firstName: decoded.userData.firstName,
        lastName: decoded.userData.lastName,
        address: decoded.userData.address,
        email: decoded.userData.email,
        picURL: decoded.userData.picURL,
        userType: decoded.userData.userType
      }
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer();
      return;
    }
  }

  public logout() {
    if (this.socialLoggedIn) {
          this.authService.signOut();
    }
    this.user = null;
    this.userType = 'pub';
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearToken();
    this.router.navigate(['/']);
  }

  private setAuthTimer() {
    console.log('timer log');
    const data = this.getToken();
    const tokenObj = this.decodeToken(data);
    const now = new Date().getTime();
    const duration = tokenObj.exp * 1000 - now;
    const isAlive = !tokenObj.isExp;
    if (isAlive) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration);
    } else {
      this.logout();
    }
  }

  private storeToken(data: any) {
    localStorage.setItem('token101', data);
  }

  public getToken() {
    const localStorageServerTokenData = localStorage.getItem('token101');
    if (localStorageServerTokenData) {
      return localStorageServerTokenData;
    } else {
      return null;
    }
  }

  private clearToken() {
    localStorage.removeItem('token101');
  }

  private decodeToken(
    token: string
  ): any  {
    if (token === null || token === undefined) {
      return null;
    }
    const payload = token.split('.')[1];
    console.log('decode token ************************');
    const bodyJSON = JSON.parse(atob(payload));
    const now = new Date().getTime();
    const bool = !(now < bodyJSON.exp * 1000 && bodyJSON.iat * 1000 < now);
    const obj = {
      id: bodyJSON.id,
      iat: bodyJSON.iat,
      exp: bodyJSON.exp,
      isExp: bool,
      userData: bodyJSON.userData
    };
    return obj;
  }
}
