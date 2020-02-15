import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'app/data/models/question';
import { QuestionService } from 'app/data/services/question.service';
import { CategoryService } from 'app/data/services/category.service';
import { UserService } from 'app/data/services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  question;
  categories: any[];
  questionModel = new Question();
  id: string;
  user;
  userId: string;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  alltags: string[] = ['NodeJs','Angular','Express','git','MongoDb'];

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private categoryService: CategoryService, private questionService: QuestionService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.getQuestion();
    }

    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });

    this.questionModel.tags=[];
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));

    this.user = this.userService.getUserData();
    this.questionModel.userId = this.user.id;
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
            console.log('Success created', data);
            this.router.navigate([`/questions`]);
          },
          error => console.log('Error', error)
        );
    } else {
      this.questionService.questionUpdate(this.questionModel)
        .subscribe(
          data => {
            console.log('Success', data);
            this.router.navigate([`/questions/${this.id}`]);
          },
          error => console.log('Error', error)
        );
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.questionModel.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.questionModel.tags.indexOf(tag);

    if (index >= 0) {
      this.questionModel.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.questionModel.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
