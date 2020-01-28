import { Component, OnInit } from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { UserService } from '../../data/services/user.service';
import { AlertService } from 'app/data/services/alert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/data/services/category.service';

export interface Field {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {

  category: FormGroup;

  proList: ServerData[] = null;
  filteredList: ServerData[] = null;

  fields: Field[] = null;
  //  [
  //   { value: 'edu', viewValue: 'Education' },
  //   { value: 'it', viewValue: 'Information Technology' },
  //   { value: 'health', viewValue: 'Health' },
  //   { value: 'cc', viewValue: 'career coaching' },
  //   { value: 'final', viewValue: 'financial' },
  // ];

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {

    this.categoryService.getAllCategories().subscribe(val => {
      let arryList: any = val.map((v: any) => {
        return {
          value: v._id,
          viewValue: v.name,}
      });
      this.fields = arryList;
    });

    this.category = this.formBuilder.group({
      Ctrl_1: [null, [Validators.required]],
    });

    let res: any;
    this.userService.getProList().subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert('Something wrong !');
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.proList = res.serverData;
      }
    );
  }

  onChange() {

    this.filteredList = this.proList.filter(val => {
      return val.category === this.category.value.Ctrl_1;
    });

    if (this.filteredList.length === 0) {
      this.alertService.setAlert('professionals not available');
      this.alertService.showAlert();
    }
  }

  view(item: any) {
    this.router.navigate(['../booking'], { queryParams: { id: item._id, type: item.userType } });
  }

}
