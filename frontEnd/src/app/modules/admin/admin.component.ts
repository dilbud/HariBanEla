import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/data/services/category.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public categories: any[]
  constructor(private categoryService: CategoryService, ) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res => {
      console.log(res);
      this.categories = res;
    });
  }

}

