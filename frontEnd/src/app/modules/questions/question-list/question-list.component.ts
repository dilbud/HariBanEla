import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'app/data/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    return this.questionService.questionList().subscribe(res => {
      this.questions = res;
    }, err => {
      console.log(err);
    });
  }

}
