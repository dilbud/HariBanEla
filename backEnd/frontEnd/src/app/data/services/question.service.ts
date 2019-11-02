import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  questionCreate(question: Question){
    return this.http.post(this.url, question);
  }

  questionList(){
    return this.http.get(this.url);
  }

  getQuestion(id){
    return this.http.get(this.url+'/'+id);
  }

  editQuestion(question: Question){
    return this.http.put(this.url+'/'+question._id,question);
  }

  deleteQuestion(id){
    return this.http.delete(this.url+'/'+id);
  }
}
