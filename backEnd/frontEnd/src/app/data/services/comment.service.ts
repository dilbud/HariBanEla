import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  addComment(comment, questionId: string, answerId?: string) {
    if (!answerId) {
      return this.http.put(this.url + '/' + questionId + '/comments', comment);
    }else{
      return this.http.put(this.url + '/' + questionId+ '/' + answerId + '/comments', comment);
    }
  }

}
