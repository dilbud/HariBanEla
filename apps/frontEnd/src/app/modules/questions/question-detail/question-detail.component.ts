import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/data/services/question.service';
import { UserService } from 'app/data/services/user.service';
import { ServerData } from 'app/data/models/serverData';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question;
  interval;
  owner;
  user;
  mode = true;
  isAuthenticated = false;
  votedUpDown = 0; // not=0, up=1 down=2
  qs;

  constructor(private questionService: QuestionService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQuestion();

    // this.interval = setInterval(() => {
    //   this.refreshQuestion();
    // }, 600000);

  }

  getOwner() {
    this.userService.getUserDataById(this.question.userId).subscribe(res => {
      this.owner = res.serverData;
    }, err => {
      console.log(err);
    });
  }

  getUser() {
    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    if(this.user){
      this.checkVote();
    }
    // console.log(this.user);
    this.userService.getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.user = this.userService.getUserData();
        this.mode = !this.isAuthenticated;

      });
    this.mode = !this.isAuthenticated;
  }

  getQuestion() {
    const id = this.route.snapshot.params.id;
    this.questionService.getQuestion(id).subscribe(res => {
      this.question = res;
      // this.question.answers.sort((a, b) => (a.votes > b.votes) ? 1 : -1);
      this.getUser();
      this.getOwner();

      console.log(this.question);
    }, err => {
      console.log(err);
    });
  }

  checkVote() {
    let flag = 0;
    this.question.voters.forEach(voter => {
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
    const id = this.route.snapshot.params.id;
    this.questionService.refreshQuestion(id).subscribe(res => {
      this.question = res;
      this.getUser();
    }, err => {
      console.log(err);
    });
  }

  voteQuestion(status) {
    const id = this.route.snapshot.params.id;
    this.questionService.voteQuestion(id, status, this.user.id).subscribe(res => {
      console.log(res);
      this.refreshQuestion();
    }, err => {
      console.log(err);
    });
  }

  onDelete() {
    const id = this.route.snapshot.params.id;
    this.questionService.deleteQuestion(id).subscribe(res => {
      console.log(res);
      this.router.navigate(['/questions']);
    }, err => {
      console.log(err);
    });
  }

  onEdit() {
    const id = this.route.snapshot.params.id;
    this.router.navigate([`/questions/${id}/edit`]);
  }

  onCategory() {
    this.router.navigate([`/category/${this.question.category}`]);
  }

}
