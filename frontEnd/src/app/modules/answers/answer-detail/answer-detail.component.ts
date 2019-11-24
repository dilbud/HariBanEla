import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'app/data/models/answer';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'app/data/services/answer.service';
import { UserService } from 'app/data/services/user.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  @Input() questionId: string;
  @Input() answer: Answer;
  user;
  owner;
  @Input() mode;

  constructor(private answerService: AnswerService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner() {
    this.userService.getUserDataById(this.answer.userId).subscribe(res => {
      this.owner = res.serverData;
      console.log(this.owner);
    }, err => {
      console.log(err);
    });
  }

  onEdit() {
    this.router.navigate(['/questions/' + this.questionId + '/' + this.answer._id + '/edit']);
  }

  voteAnswer(status) {
    const id = this.route.snapshot.params.id;
    this.answerService.voteAnswer(this.questionId, this.answer._id, status).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
