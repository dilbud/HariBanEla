import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from '../data/services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: UserService, private helper: JwtHelperService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authRequest = req.clone({

    });
    return next.handle(authRequest);
  }
}
