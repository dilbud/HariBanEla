import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'app/data/services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions;
  category;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log('category');
    this.category = this.route.snapshot.params.category;
    console.log(this.category);

    if (this.category) {
      this.questionService.questionList(this.category).subscribe(res => {
        this.questions = res;
      }, err => {
        console.log(err);
      });
    } else {
      this.questionService.questionList().subscribe(res => {
        this.questions = res;
      }, err => {
        console.log(err);
      });
    }

  }
}
