import { Component, OnInit, Input } from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { QuestionService } from '../../data/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {

  @Input() user: ServerData;

  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit() {

  }

}
