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


import { UserService } from '../data/services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authRequest = req.clone({

    });
    return next.handle(authRequest);
  }
}
