import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'app/data/models/question';
import { QuestionService } from 'app/data/services/question.service';
import { CategoryService } from 'app/data/services/category.service';
import { UserService } from 'app/data/services/user.service';

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
  user;
  userId: string;

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.getQuestion();
    }

    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });

    this.user = this.userService.getUserData();
    this.questionModel.userId=this.user.id;
  }

  getQuestion() {
    this.questionService.getQuestion(this.id).subscribe(res => {
      // console.log(res);
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
            console.log("Success created", data);
            this.router.navigate([`/questions`]);
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
