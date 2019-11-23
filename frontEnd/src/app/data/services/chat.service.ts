import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

const apiUrl = environment.baseUrl + 'chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService   {
public currentUser :any
public roomId :string
public userId: string

  constructor(private http: HttpClient) { }

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
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  // APIs
  getChatById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    if (id == null) {
      return of(0);
    }
    return this.http.get(url).pipe(
      map(this.extractData), catchError(this.handleError));
  }
  
  updateCategoryById(id, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  addUser(userId:string,roomId) {
      axios.post(apiUrl+'/users', { userId })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: apiUrl+'/authenticate'
        });
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: environment.chatkitInstanceLocator,
          userId,
          tokenProvider
        });

        return chatManager.connect().then(currentUser => {
            this.currentUser = currentUser; 
            this.joinRoom(roomId);         
          });
      })
        .catch(error => console.error(error))
  }
  joinRoom(roomId){
    this.currentUser.joinRoom({ roomId: roomId })
    .then(room => {
      console.log(`Joined room with ID: ${room.id}`)
    })
    .catch(err => {
      console.log(`Error joining room ${roomId}: ${err}`)
    })
   }


}
