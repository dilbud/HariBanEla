import { Component, OnInit } from '@angular/core';
import { Question } from 'app/data/models/question';
import { QuestionService } from 'app/data/services/question.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  questionModel = new Question();

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  onQuestion() {
    this.questionService.questionCreate(this.questionModel)
      .subscribe(
        data => console.log("Success", data),
        error => console.log("Error", error)
      );
  }

}
