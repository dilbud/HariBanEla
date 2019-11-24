import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

const apiUrl = environment.baseUrl + 'questions';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment, questionId: string, answerId?: string) {
    console.log('comment');
    console.log(comment);
    if (!answerId) {
      return this.http.put(apiUrl + '/' + questionId + '/comments', comment);
    } else {
      return this.http.put(apiUrl + '/' + questionId + '/' + answerId + '/comments', comment);
    }
  }

}
