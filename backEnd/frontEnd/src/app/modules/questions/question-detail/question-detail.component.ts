import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/data/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question: object;

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.questionService.getQuestion(id).subscribe(res => {
      this.question = res;
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
