import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ServerData } from '../../data/models/serverData';
import { UserService } from '../../data/services/user.service';
import { AlertService } from 'app/data/services/alert.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {

  proList: ServerData[] = null;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
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

  view(item: any) {
    this.router.navigate(['../booking'], { queryParams: { id: item._id, type: item.userType} });
  }




}
