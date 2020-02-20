import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const apiUrl = environment.baseUrl + 'chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // remove body so you don't have to deal with the body object
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // APIs

  createRoom(data): Observable<any> {
    return this.http
      .post(`${apiUrl}/createRoom/${data}`, {})
      .pipe(catchError(this.handleError));
  }
}
