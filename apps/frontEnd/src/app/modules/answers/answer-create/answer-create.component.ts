import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerService } from 'app/data/services/answer.service';
import { Answer } from 'app/data/models/answer';
import { UserService } from 'app/data/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.scss']
})
export class AnswerCreateComponent implements OnInit {

  answerModel = new Answer();
  submitted: boolean;
  success;
  @Input() questionId;
  @Input() user;
  @Output() refreshEvent = new EventEmitter();

  constructor(private answerService: AnswerService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // console.log(this.owner);
    // if(!this.user){
    //   this.user = this.userService.getUserData();
    // }
    this.submitted = false;
    this.answerModel.userId = this.user.id;
  }

  onAnswer() {
    this.submitted = true;
    console.log(this.answerModel);
    this.answerService.addAnswer(this.answerModel, this.questionId)
      .subscribe(
        data => {
          console.log('Success', data);
          this.success = data;
          if (this.success === true) {
            this.answerModel.body = '';
            this.submitted = false;
            this.refreshEvent.emit();
          }
        },
        error => console.log('Error', error)
      );
  }

}
