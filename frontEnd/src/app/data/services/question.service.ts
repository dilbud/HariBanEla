import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { environment } from '@env';

const apiUrl = environment.baseUrl + 'questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  

  constructor(private http: HttpClient) { }

  questionCreate(question: Question) {
    // console.log(question);
    return this.http.post(apiUrl, question);
  }

  questionList() {
    return this.http.get(apiUrl);
  }

  getQuestion(id) {
    return this.http.get(apiUrl + '/' + id);
  }

  refreshQuestion(id) {
    return this.http.get(apiUrl+ '/' + id + '?refresh=1');
  }

  voteQuestion(id, status) {
    if (status == 1) {
      return this.http.get(apiUrl + '/' + id + '/vote?vote=1');
    } else {
      return this.http.get(apiUrl + '/' + id + '/vote?vote=0');
    }

  }

  questionUpdate(question: Question) {
    return this.http.put(apiUrl + '/' + question._id, question);
  }

  deleteQuestion(id) {
    return this.http.delete(apiUrl + '/' + id);
  }
}
