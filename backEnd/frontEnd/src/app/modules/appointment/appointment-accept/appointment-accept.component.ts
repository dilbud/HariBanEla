import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';

@Component({
  selector: 'app-appointment-accept',
  templateUrl: './appointment-accept.component.html',
  styleUrls: ['./appointment-accept.component.scss']
})
export class AppointmentAcceptComponent implements OnInit {
  public appointmentId: string
  public userName: string
  public userId: string
  public userPhoto: string
  public subject: string
  public description: string
  public status:string
  public startTime: string
  public duration: string
  public endTime: string

  constructor(private appointmentService: AppointmentService, private redirect: Router, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.appointmentId = this.route.snapshot.params.id;
    this.userPhoto="https://lh4.googleusercontent.com/-yUG1fx5VXbY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdn62LesVDBvcpG1PFEv7aAuxByWg/s96-c/photo.jpg"
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(res => {
      this.userId = res.userId
      this.userName = res.userName
      this.subject = res.subject
      this.description = res.description
      this.startTime = res.startTime
      this.duration = res.duration
      this.endTime = res.endTime
    },
      err => {
        console.log(err);
      })
  }
  accepted(){
    this.status="Accepted"
    this.appointmentService.acceptAppointment(this.appointmentId,this.status).subscribe(res=>{
      this.redirect.navigate(['/profile']);
    })
  }
  rejected(){
    this.status="Rejected"
    this.appointmentService.acceptAppointment(this.appointmentId,this.status).subscribe(res=>{
      this.redirect.navigate(['/profile']);
    })
  }
}
