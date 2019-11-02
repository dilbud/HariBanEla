import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  addAnswer(id: string,answer: Answer){
    return this.http.put(this.url+'/'+id+'/answers', answer);
  }

}
