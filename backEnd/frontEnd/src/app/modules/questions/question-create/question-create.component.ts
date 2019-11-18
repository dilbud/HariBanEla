import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'app/data/models/question';
import { QuestionService } from 'app/data/services/question.service';
import { CategoryService } from 'app/data/services/category.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  question;
  categories: any[]
  questionModel = new Question();
  id: string;

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.getQuestion();
    }

    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  getQuestion() {
    this.questionService.getQuestion(this.id).subscribe(res => {
      console.log(res);
      this.question = res;
      this.questionModel._id = this.question._id;
      this.questionModel.title = this.question.title;
      this.questionModel.body = this.question.body;
      this.questionModel.category = this.question.category;
      this.questionModel.tags = this.question.tags;
    }, err => {
      console.log(err);
    });
  }

  onQuestion() {
    if (!this.id) {
      this.questionService.questionCreate(this.questionModel)
        .subscribe(
          data => {
            console.log("Success", data);
            this.router.navigate([`/questions/${this.id}`]);
          },
          error => console.log("Error", error)
        );
    } else {
      this.questionService.questionUpdate(this.questionModel)
        .subscribe(
          data => {
            console.log("Success", data);
            this.router.navigate([`/questions/${this.id}`]);
          },
          error => console.log("Error", error)
        );
    }
  }
}
