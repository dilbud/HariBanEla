import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/data/services/category.service';
import { UserService } from 'app/data/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories: any[]
  isAuthenticated=false

  constructor(private categoryService: CategoryService,private userService:UserService) { }
  user = null;
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener()
    .subscribe( (isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.user = this.userService.getUserData();
      // this.mode = !this.isAuthenticated;
    });
    
    
   
  }

}
