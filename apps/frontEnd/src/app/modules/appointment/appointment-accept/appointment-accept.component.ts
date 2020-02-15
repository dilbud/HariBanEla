import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { UserService } from 'app/data/services/user.service';

@Component({
  selector: 'app-appointment-accept',
  templateUrl: './appointment-accept.component.html',
  styleUrls: ['./appointment-accept.component.scss']
})
export class AppointmentAcceptComponent implements OnInit {
  public appointmentId: string;
  public userName: string;
  public userId: string;
  public userPhoto: string;
  public subject: string;
  public description: string;
  public status: string;
  public startTime: string;
  public duration: string;
  public endTime: string;
  public professionalId: string;

  constructor(
    private appointmentService: AppointmentService,
    private redirect: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.appointmentId = this.route.snapshot.params.id;
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      res => {
        this.userId = res.userId;
        this.userName = res.userName;
        this.subject = res.subject;
        this.description = res.description;
        this.startTime = res.startTime;
        this.duration = res.duration;
        this.endTime = res.endTime;
        this.professionalId = res.professionalId;
        const token = this.userService.getToken();
        const decoded = this.userService.decodeToken(token);
        if (this.professionalId !== decoded.id) {
          this.redirect.navigate(['/']);
        }
        this.userService.getUserDataById(this.userId).subscribe(
          res1 => {
            this.userPhoto = res1.serverData.picURL;
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
  accepted() {
    this.status = 'Accepted';
    this.appointmentService
      .acceptAppointment(this.appointmentId, this.status)
      .subscribe(res => {
        this.redirect.navigate(['/profile']);
      });
  }
  rejected() {
    this.status = 'Rejected';
    this.appointmentService
      .acceptAppointment(this.appointmentId, this.status)
      .subscribe(res => {
        this.redirect.navigate(['/profile']);
      });
  }
}
