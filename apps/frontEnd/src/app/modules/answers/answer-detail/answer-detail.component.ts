import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() answer;
  @Input() user;
  @Input() mode;
  @Output() refreshEvent = new EventEmitter();
  owner;
  votedUpDown = 0; // not=0, up=1 down=2

  constructor(private answerService: AnswerService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getOwner();
    this.checkVote();
    // console.log("id in ans "+this.user.id);
  }

  getOwner() {
    this.userService.getUserDataById(this.answer.userId).subscribe(res => {
      this.owner = res.serverData;
      // console.log(this.owner);
    }, err => {
      console.log(err);
    });
  }

  onEdit() {
    this.router.navigate(['/questions/' + this.questionId + '/' + this.answer._id + '/edit']);
  }

  onDelete() {
    this.answerService.deleteAnswer(this.questionId, this.answer._id).subscribe(res => {
      this.refreshEvent.emit();
      // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
      // this.router.navigate([`/questions/${this.questionId}`]));
    }, err => {
      console.log(err);
    });
    // this.router.navigate(['/questions/' + this.questionId]);

  }

  voteAnswer(status) {
    const id = this.route.snapshot.params.id;
    this.answerService.voteAnswer(this.questionId, this.answer._id, status, this.user.id).subscribe(res => {
      console.log(res);
      this.refreshEvent.emit();
      // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
      // this.router.navigate([`/questions/${this.questionId}`]));
    }, err => {
      console.log(err);
    });
  }

  checkVote() {
    let flag = 0;
    this.answer.voters.forEach(voter => {
      if (voter.userId == this.user.id) {
        this.votedUpDown = voter.upDown;
        flag = 1;
      }
    });
    if (flag == 0) {
      this.votedUpDown = 0;
    }
  }

  refreshQuestion() {
    this.refreshEvent.emit();
  }

  viewProfile() {
    this.router.navigate(['../../view'], { queryParams: { id: this.owner.id, type: this.owner.userType } });
  }

}
