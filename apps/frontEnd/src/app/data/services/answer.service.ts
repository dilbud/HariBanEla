import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

const apiUrl = environment.baseUrl + 'questions';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  constructor(private http: HttpClient) { }

  addAnswer(answer, id: string) {
    console.log(answer);
    return this.http.put(apiUrl + '/' + id + '/answers', answer);
  }

  deleteAnswer(questionId, answerId) {
    return this.http.delete(apiUrl + '/' + questionId + '/answers/' + answerId);
  }

  acceptAnswer(questionId, answerId) {
    return this.http.get(apiUrl + '/' + questionId + '/answers/' + answerId+'/accept');
  }

  editAnswer(answer, questionId, answerId) {
    return this.http.put(apiUrl + '/' + questionId + '/answers/' + answerId, answer);
  }

  voteAnswer(questionId, answerId, status, userId: string) {
    if (status == 1) {
      return this.http.put(apiUrl + '/' + questionId + '/answers/' + answerId + '/vote?vote=1', {userId});
    } else {
      return this.http.put(apiUrl + '/' + questionId + '/answers/' + answerId + '/vote?vote=0', {userId});
    }
  }

}
