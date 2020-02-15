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

  questionList(category?) {
    console.log(category);
    if (!category) {
      return this.http.get(apiUrl);
    } else {
      return this.http.get(apiUrl + '/category/' + category);
    }

  }

  getQuestion(id) {
    return this.http.get(apiUrl + '/' + id);
  }

  getQuestionsOfUser(userId) {
    return this.http.get(apiUrl + '/user/' + userId);
  }

  refreshQuestion(id) {
    return this.http.get(apiUrl + '/' + id + '?refresh=1');
  }

  voteQuestion(id, status, userId: string) {
    if (status == 1) {
      return this.http.put(apiUrl + '/' + id + '/vote?vote=1', { userId });
    } else {
      return this.http.put(apiUrl + '/' + id + '/vote?vote=0', { userId });
    }

  }

  questionUpdate(question: Question) {
    return this.http.put(apiUrl + '/' + question._id, question);
  }

  deleteQuestion(id) {
    return this.http.delete(apiUrl + '/' + id);
  }

  searchQuestions(searchInput: String) {
    return this.http.put(apiUrl+'/search', {searchInput: searchInput});
  }
}
