import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ServerData } from '../../data/models/serverData';
import { UserService } from '../../data/services/user.service';
import { AlertService } from 'app/data/services/alert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface Food {
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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {

    this.category = this.formBuilder.group({
      Ctrl_1: [null, [Validators.required]],
    });
    console.log('ddddddddddddddddddddddddddddddddddddddddddddddddd', this.category.value.Ctrl_1);
    let res;
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
  }

  view(item: any) {
    this.router.navigate(['../booking'], { queryParams: { id: item._id, type: item.userType } });
  }

}
