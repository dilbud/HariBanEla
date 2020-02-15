import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: UserService,
    private router: Router,
    private alertService: AlertService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    const isAuth = this.auth.getIsAuth();
    if (!isAuth) {
      // this.router.navigate(['/']);
      this.alertService.setAlert('Please Login First');
      this.alertService.showAlert();
    }
    return isAuth;
  }
}
