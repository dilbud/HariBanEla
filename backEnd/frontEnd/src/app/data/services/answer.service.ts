import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  addAnswer(answer, id: string) {
    console.log(answer);
    return this.http.put(this.url + '/' + id + '/answers', answer);
  }

  editAnswer(answer, questionId, answerId) {
    return this.http.put(this.url + '/' + questionId + '/' + answerId, answer);
  }

  voteAnswer(questionId, answerId, status) {
    if (status == 1) {
      return this.http.get(this.url + '/' + questionId + '/' + answerId + '/vote?vote=1');
    } else {
      return this.http.get(this.url + '/' + questionId + '/' + answerId + '/vote?vote=0');
    }
  }

}
