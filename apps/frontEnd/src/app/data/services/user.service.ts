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
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class UserService  {
  private apiUrl = environment.baseUrl + 'user';
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
    userType: String,
    category: String,
  };
  private otherUser = {
    id: String,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    picURL: String,
    userType: String
  };

  private proProfileArry: ServerData [] = null;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
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
  public getUserDataById(userId: string): any {
    return this.http.post(this.apiUrl + '/getUserById', { id: userId});

    // let res: any;
    // this.http
    //   .post('http://localhost:3000/api/user/getUserById', {
    //     id: userId,
    //   })
    //   .subscribe(
    //     response => {
    //       res = response;
    //       console.log(res.serverData,"-----------------")
    //       this.otherUser = res.serverData;
    //     },
    //     error => {
    //       this.AlertService.setAlert('Something wrong !');
    //       this.AlertService.setAlert(error.error.msg);
    //       this.AlertService.showAlert();
    //     },
    //     () => {

    //     }
    //   );
    //   return this.otherUser;
  }

  public getAuthStatusListener(): any {
       return this.authStatusListener.asObservable();
  }

  public getProList() {
    return this.http.get(this.apiUrl + '/proList');
  }

  public getAllUser() {
    return this.http.get(this.apiUrl + '/allUser');
  }
  public getAllPendingUser() {
    return this.http.get(this.apiUrl + '/allPendingUser');
  }

  public getProProfile(proId: string) {
    return this.http.get(this.apiUrl + '/proProfile', { params: {id: proId}});
  }


  // -------------------------------------------------------- update begin
  public updateUser(data: UserData) {
    let res: any;
    this.http
      .post(this.apiUrl + '/update', {
        id: this.user.id,
        query: data
      })
      .subscribe(
        response => {
          res = response;
        },
        error => {
          this.alertService.setAlert('Something wrong !');
          this.alertService.setAlert(error.error.msg);
          this.alertService.showAlert();
        },
        () => {
          this.user = res.serverData;
          this.token = res.token;
          this.storeToken(this.token);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.setAuthTimer();
          // this.router.navigate(['/']);
          this.alertService.setAlert(
            'Hi ' + data.firstName + ' your account is updated'
          );
          this.alertService.showAlert();
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
          userType: 'gen',
          category: 'null',
          rate: 0,
          paymentPerHour: 0,
          doc: [],
          pending: false,
          active: true
        };
        let res: any;
        this.http
          .post(this.apiUrl + '/create', this.serverData)
          .subscribe(
            response => {
              res = response;
            },
            error => {
              this.alertService.setAlert('Something wrong !');
              this.alertService.setAlert(error.error.msg);
              this.alertService.showAlert();
            },
            () => {
              this.user = res.serverData;
              this.token = res.token;
              this.storeToken(this.token);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              this.setAuthTimer();
              if (res.msg === 'created') {
                this.alertService.setAlert(
                  'Hi ' + data.name + ' your account is created'
                );
              }
              if (res.msg === 'exist') {
                this.alertService.setAlert(
                  'Hi ' + data.name + ' your are sign in'
                );
              }
              this.alertService.setAlert('Hi ' + data.name);
              this.alertService.showAlert();
            }
          );
      })
      .catch(error => {
        this.alertService.setAlert('Try later ...');
        this.alertService.showAlert();
      });
  }

  public facebook() {
    this.authService
    .signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      const data = this.fetchSocialData();
      this.serverData = {
        id: 'null',
        firstName: data.firstName,
        lastName: data.lastName,
        address: 'null',
        email: data.email,
        picURL: data.photoUrl,
        userType: 'gen',
        category: 'null',
        rate: 0,
        paymentPerHour: 0,
        doc: [],
        pending: false,
        active: true
      };
      let res: any;
      this.http
        .post(this.apiUrl + '/create', this.serverData)
        .subscribe(
          response => {
            res = response;
          },
          error => {
            this.alertService.setAlert('Something wrong !');
            this.alertService.setAlert(error.error.msg);
            this.alertService.showAlert();
          },
          () => {
            this.user = res.serverData;
            this.token = res.token;
            this.storeToken(this.token);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.setAuthTimer();
            if (res.msg === 'created') {
              this.alertService.setAlert(
                'Hi ' + data.name + ' your account is created'
              );
            }
            if (res.msg === 'exist') {
              this.alertService.setAlert(
                'Hi ' + data.name + ' your are sign in'
              );
            }
            this.alertService.setAlert('Hi ' + data.name);
            this.alertService.showAlert();
          }
        );
    })
    .catch(error => {
      this.alertService.setAlert('Try later ...');
      this.alertService.showAlert();
    });
  }

  public login(email: string, password: string) {
    const authData: AuthData = { email, password };
    let res: any;
    this.http.post(this.apiUrl + '/login', authData).subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert('Something wrong !');
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.user = res.serverData;
        this.token = res.token;
        this.storeToken(this.token);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setAuthTimer();
        this.alertService.setAlert(
          'Hi ' +
            this.user.firstName +
            ' ' +
            this.user.lastName
        );
        this.alertService.showAlert();
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
      this.user = {
        id: decoded.id,
        firstName: decoded.userData.firstName,
        lastName: decoded.userData.lastName,
        address: decoded.userData.address,
        email: decoded.userData.email,
        picURL: decoded.userData.picURL,
        userType: decoded.userData.userType,
        category: decoded.userData.category
      };
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
