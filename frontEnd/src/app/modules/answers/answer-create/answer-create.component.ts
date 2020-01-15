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
  @Input() questionId;
  @Input() user;
  @Output() refreshEvent = new EventEmitter();

  constructor(private answerService: AnswerService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // console.log(this.owner);
    // if(!this.user){
    //   this.user = this.userService.getUserData();
    // }
    this.answerModel.userId = this.user.id;
  }

  onAnswer() {
    this.answerService.addAnswer(this.answerModel, this.questionId)
      .subscribe(
        data => {
          console.log('Success', data);
          this.refreshEvent.emit();
          // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
          //   this.router.navigate([`/questions/${this.questionId}`]));
        },
        error => console.log('Error', error)
      );
  }

}
