import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/data/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question;
  interval;
  isAnswerCollapsed = true;
  isCommentCollapsed = true;

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQuestion();
    this.interval = setInterval(() => {
      this.refreshQuestion();
    }, 600000);
}

getQuestion(){
  let id = this.route.snapshot.params.id;
  this.questionService.getQuestion(id).subscribe(res => {
    this.question = res;
  }, err => {
    console.log(err);
  });
}

refreshQuestion(){
  let id = this.route.snapshot.params.id;
  this.questionService.refreshQuestion(id).subscribe(res => {
    this.question = res;
  }, err => {
    console.log(err);
  });
}

voteQuestion(status){
  let id = this.route.snapshot.params.id;
  this.questionService.voteQuestion(id,status).subscribe(res => {
    console.log(res);
    this.refreshQuestion();
  }, err => {
    console.log(err);
  });
}

onDelete() {
  let id = this.route.snapshot.params.id;
  this.questionService.deleteQuestion(id).subscribe(res => {
    console.log(res);
    this.router.navigate(['/questions']);
  }, err => {
    console.log(err);
  });
}

onEdit() {
  let id = this.route.snapshot.params.id;
  this.router.navigate([`/questions/${id}/edit`]);
}

}
