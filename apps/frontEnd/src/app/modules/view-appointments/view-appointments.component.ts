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

  constructor(
    private appointmentService: AppointmentService,
  ) { }

  ngOnInit() {
    this.appointmentService.getAppointmentByUserId(this.user.id).subscribe(result => {
      console.log(result);
    });
  }

}
