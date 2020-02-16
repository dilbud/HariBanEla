import { Component, OnInit } from '@angular/core';
import { Question } from 'app/data/models/question';
import { QuestionService } from 'app/data/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'app/data/models/answer';
import { AnswerService } from 'app/data/services/answer.service';

@Component({
  selector: 'app-answer-update',
  templateUrl: './answer-update.component.html',
  styleUrls: ['./answer-update.component.scss']
})
export class AnswerUpdateComponent implements OnInit {
  questionId: string;
  answerId: string;
  question;
  questionModel = new Question();
  answerModel = new Answer();
  submitted: boolean;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.getQuestion();
  }

  getQuestion() {
    this.questionId = this.route.snapshot.params.questionId;
    this.answerId = this.route.snapshot.params.answerId;
    console.log('ddd ' + this.answerId);
    this.questionService.getQuestion(this.questionId).subscribe(
      res => {
        this.question = res;
        // console.log(this.question);
        this.questionModel.title = this.question.title;
        this.questionModel.body = this.question.body;

        for (const answer of this.question.answers) {
          // console.log(this.question);
          if (answer._id === this.answerId) {
            this.answerModel = answer;
            break;
          }
        }
        console.log(this.answerModel);

      },
      err => {
        console.log(err);
      }
    );
  }

  onAnswer() {
    this.submitted = true;
    if (this.answerModel.body) {
      this.answerService
        .editAnswer(this.answerModel, this.questionId, this.answerId)
        .subscribe(
          data => {
            console.log('Success', data);
            this.router.navigate([`/questions/${this.questionId}`]);
          },
          error => console.log('Error', error)
        );
    }


  }
}
