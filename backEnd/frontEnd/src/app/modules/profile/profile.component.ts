import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/data/services/user.service';
import { AppointmentService } from 'app/data/services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   user = null;

  constructor(private userService: UserService,private appointmentService: AppointmentService, private redirect: Router) { }

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener()
    .subscribe( (isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
  }
makeAppointment(){
 this.appointmentService.changeProfessionalId(this.user.id);
  this.redirect.navigate(['/appointment/new']);
}
}

