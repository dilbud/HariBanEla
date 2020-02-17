import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/data/services/category.service';
import { UserService } from 'app/data/services/user.service';
import { Router } from '@angular/router';
import { QuestionService } from 'app/data/services/question.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  questions;
  searchInput = "";
  searchResults;
  categories: any[];
  isAuthenticated = false;

  constructor(private categoryService: CategoryService, private userService: UserService, private questionService: QuestionService, private router: Router) { }
  user = null;
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    console.log(this.user);
    this.userService.getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.user = this.userService.getUserData();
        // this.mode = !this.isAuthenticated;
      });
    this.questionService.questionList().subscribe(res => {
      this.questions = res;
    }, err => {
      console.log(err);
    });
  }

  onSearch() {
    if (this.searchInput != '') {
      // console.log(this.searchInput);
      this.searchResults = this.questions.filter(question => {
        return question.title.toLowerCase().includes(this.searchInput.toLowerCase());
      });

      // this.questionService.searchQuestions(this.searchInput).subscribe(res => {
      //   this.searchResults=res;
      //   console.log(this.searchResults);
      // });
    } else {
      this.searchResults = [];
    }
  }

  onCategory(category) {
    // this.router.navigate([`/category/${category}`]);
    this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
      this.router.navigate([`/category/${category}`]));
  }
  view() {
    this.router.navigate(['../account'], { queryParams: { id: this.user.id, type: 'current' } });
  }

}
