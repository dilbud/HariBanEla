import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'app/data/models/question';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.component.html',
  styleUrls: ['./question-summary.component.scss']
})
export class QuestionSummaryComponent implements OnInit {

  @Input() question:Question;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.question);
  }

  onQuestion(){
    this.router.navigate(['/questions',this.question._id]);
  }

}
