import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../data/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  public method = 'Update';
  public categoryId: any;
  public categoryForm: FormGroup;
  public name: string;
  /**
   * @param  {Router} privateredirect
   * @param  {ActivatedRoute} privateroute
   * @param  {CategoryService} privatecategoryService
   * @param  {FormBuilder} privateformBuilder
   */
  constructor(private redirect: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required]
    });

    this.categoryId = this.route.snapshot.params.id;
    if (this.categoryId == 'new') {
      this.method = 'Add';
      this.categoryId = null;
    } else {
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        res => {
          this.categoryForm.patchValue({ name: res.name });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  /**
   * @param  {NgForm} form
   */
  addCategory(form: NgForm) {
    console.log(form, 'form');
    if (this.categoryId) {
      this.categoryService
        .updateCategoryById(this.categoryId, form)
        .subscribe(
          data => {
            console.log(data, 'update');
            this.redirect.navigate(['/admin']);
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.categoryService.addCategory(form).subscribe(
        data => {
          console.log(data, 'add');
          this.redirect.navigate(['/admin']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deleteCategory(id = this.route.snapshot.params.id) {
    this.categoryService.deleteCategoryById(id).subscribe(
      data => {
        this.redirect.navigate(['/admin']);
      },
      err => {
        console.log(err);
      }
    );
  }

  deletePortfolio() {
    return null;
  }
}
