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

  constructor(private questionService: QuestionService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQuestion();
    this.interval = setInterval(() => {
      this.refreshQuestion();
    }, 600000);

    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    console.log('this.user');
    console.log(this.user);
    this.userService.getAuthStatusListener()
    .subscribe( (isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.user = this.userService.getUserData();
      this.mode = !this.isAuthenticated;
    });
    this.mode = !this.isAuthenticated;
}

getOwner() {
  this.userService.getUserDataById(this.question.userId).subscribe(res => {
    this.owner = res.serverData;
  }, err => {
    console.log(err);
  });
}

getQuestion() {
  const id = this.route.snapshot.params.id;
  this.questionService.getQuestion(id).subscribe(res => {
    this.question = res;
    this.getOwner();
    console.log(this.question);
  }, err => {
    console.log(err);
  });
}

refreshQuestion() {
  const id = this.route.snapshot.params.id;
  this.questionService.refreshQuestion(id).subscribe(res => {
    this.question = res;
  }, err => {
    console.log(err);
  });
}

voteQuestion(status) {
  const id = this.route.snapshot.params.id;
  this.questionService.voteQuestion(id, status).subscribe(res => {
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

}
