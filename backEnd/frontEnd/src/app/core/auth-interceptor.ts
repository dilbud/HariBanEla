import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../data/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authService.autoAuthUser();
    const authToken = this.authService.getServerToken();
    console.log('zzzzzzzzzzzzz');
    console.log(authToken.token101);
    console.log(authToken.token202);
    console.log('zzzzzzzzzzzzz');
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', JSON.stringify(authToken)),
    });
    return next.handle(authRequest);
  }
}
