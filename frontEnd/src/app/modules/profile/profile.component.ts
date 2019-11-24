import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/data/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertService } from 'app/data/services/alert.service';
import { AppointmentService } from 'app/data/services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = null;
  id = null;

  mode = false;


  constructor(private userService: UserService, private appointmentService: AppointmentService, private redirect: Router, private route: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.id = queryParams.id;
      console.log(this.id, '**************************');
      if (this.id === null || this.id === undefined) {
        this.mode = true;
      }
    });

    if (!this.mode) {
      let res;
      this.userService.getProProfile(this.id).subscribe(
        response => {
          res = response;
        },
        error => {
          this.alertService.setAlert('Something wrong !');
          this.alertService.setAlert(error.error.msg);
          this.alertService.showAlert();
        },
        () => {
          this.user = res.serverData;
        }

      );
    }

    if (this.mode) {
      this.user = this.userService.getUserData();
      this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
        this.user = this.userService.getUserData();
      });
    }
  }
  makeAppointment() {
    this.appointmentService.changeProfessionalId(this.user.id);
    this.redirect.navigate(['/appointment/new']);
   }
}



