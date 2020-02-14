import { Component, OnInit, Input } from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { Router } from '@angular/router';
import { QuestionService } from '../../data/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {

  @Input() user: ServerData;
  list: any;
  sorted: any[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
  ) { }

  ngOnInit() {
      this.questionService.getQuestionsOfUser(this.user.id).subscribe(
        result => {
        this.list = result;
      },
      err => {},
      () => {

        this.sorted = this.list.sort((a: any, b: any) => {
          return Date.parse(b.createdAt)  - Date.parse(a.createdAt);
        });
      });
  }

  view(item: any) {
    this.router.navigate([`/questions/${item._id}`]);
  }

  paginate(val: any) {
  }
}
