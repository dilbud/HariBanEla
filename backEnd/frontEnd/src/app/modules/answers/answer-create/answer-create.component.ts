import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from 'app/data/services/answer.service';
import { Answer } from 'app/data/models/answer';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.scss']
})
export class AnswerCreateComponent implements OnInit {

  answerModel = new Answer();
  @Input() questionId;
  @Input() user;

  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    this.answerModel.userId = this.user.id;
  }

  onAnswer() {
    this.answerService.addAnswer(this.answerModel, this.questionId)
      .subscribe(
        data => {
          console.log("Success", data);
          // 
        },
        error => console.log("Error", error)
      );
  }

}
