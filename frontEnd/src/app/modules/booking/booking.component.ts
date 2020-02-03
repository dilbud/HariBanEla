import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'app/data/services/appointment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  id = null;
  type = null;
  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private redirect: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.id = queryParams.id;
      this.type = queryParams.type;
    });
  }

  public makeAppointment() {
    if (this.id !== null) {
      this.appointmentService.changeProfessionalId(this.id);
      this.redirect.navigate(['/appointment/new']);
    }
  }
}
