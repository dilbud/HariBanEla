import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/data/services/user.service';
import { AppointmentService } from 'app/data/services/appointment.service';
import { QuestionService } from 'app/data/services/question.service';


@Component({
  selector: 'app-profile-page-base',
  templateUrl: './profile-page-base.component.html',
  styleUrls: ['./profile-page-base.component.scss']
})
export class ProfilePageBaseComponent implements OnInit {

  isAdmin = false;
  isPro = false;
  isGen = false;
  user = null;

  appointments: any[] = null;

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
    if (this.user.userType === 'admin') {
      this.isAdmin = true;
    }
    if (this.user.userType === 'pro') {
      this.isPro = true;
    }
    if (this.user.userType === 'gen') {
      this.isGen = true;
    }

    this.appointmentService.getAppointmentByUserId('5dd0c48507c02c294c25b261').subscribe(result => {
      this.appointments = result;
      console.log('xxxxxxxxxxxx', this.appointments);
    });

    // this.questionService.get
  }

}
