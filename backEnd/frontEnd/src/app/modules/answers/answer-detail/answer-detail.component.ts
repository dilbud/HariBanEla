import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'app/data/models/answer';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  @Input() answer:Answer;

  constructor() { }

  ngOnInit() {
  }

}
