import { Component, OnInit, Input } from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { AppointmentService } from '../../data/services/appointment.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.scss']
})
export class ViewAppointmentsComponent implements OnInit {

  @Input() user: ServerData;
  List: any[] = [];
  FilterList: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit() {


    if (this.user.userType === 'pro') {
      this.appointmentService.getAppointmentByProfessionalId('5dd17e4d3c6f863e94a3bb8b').subscribe(result => {
        this.List = result;
        this.filter('up');
      });
    }
    if (this.user.userType === 'gen') {
      this.appointmentService.getAppointmentByUserId('5dd22ab5e00872228c0b757b').subscribe(result => {
        this.List = result;
        this.filter('up');
      });
    }
  }

  filter(val: any) {
    if (val === 'past') {
      this.FilterList = this.List.filter(value => {
        return  Date.parse(value.endTime) <= Date.now();
      });
    }
    if ( val === 'up') {
      this.FilterList = this.List.filter(value => {
        return Date.parse(value.startTime) >= Date.now();
      });
    }
  }



  paginate(val: any) {
  }
}
