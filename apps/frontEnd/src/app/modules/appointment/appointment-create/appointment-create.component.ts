import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/data/services/user.service';
import { validateDate } from './validateDate';
class Data {
  professionalId: any;
  professionalName: any;
  subject: any;
  description: any;
  startTime: any;
  endTime: any;
  duration: any;
  paymentAmount: any;
  userId: any;
  userName: any;
  userEmail: any;
  professionalEmail: any;
}

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {
  public professionalId: string;
  public professionalName: string;
  public professionalPhoto: string;
  public professionalEmail: string;
  public userEmail: string;
  public userName: string;
  public userId: string;
  public subject: string;
  public description: string;
  public startTime: Date;
  public duration: number;
  public endTime: Date;
  public paymentPerHour: number;
  public paymentAmount: number;
  public appointmentForm: FormGroup;
  public user: any;
  public submitted: boolean;

  constructor(
    private appointmentService: AppointmentService,
    private redirect: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userSerivce: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.professionalId = this.appointmentService.getProfesionalId();

    this.userSerivce.getUserDataById(this.professionalId).subscribe(
      res => {
        console.log(res, '-----------------------------------');
        this.professionalName =
          res.serverData.firstName + ' ' + res.serverData.lastName;
        this.paymentPerHour = res.serverData.paymentPerHour;
        this.professionalEmail = res.serverData.email;
        this.professionalPhoto = res.serverData.picURL;
      },
      err => {
        console.log(err);
        this.redirect.navigate(['/home']);
      }
    );
    this.user = this.userSerivce.getUserData();
    this.appointmentForm = this.formBuilder.group(
      {
        subject: [null, Validators.required],
        description: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required]
      }
      // {
      //   validator: validateDate('startTime', 'endTime')
      // }
    );
  }
  get f() {
    return this.appointmentForm.controls;
  }

  makeAppointment(form: NgForm) {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      return;
    }
    console.log('ththt');
    const data = new Data();
    data.professionalId = this.professionalId;
    data.professionalName = this.professionalName;
    data.professionalEmail = this.professionalEmail;
    data.userId = this.user.id;
    data.userName = this.user.firstName + ' ' + this.user.lastName;
    data.userEmail = this.user.email;
    data.subject = this.subject;
    data.description = this.description;
    data.startTime = new Date(this.startTime).getTime();
    data.endTime = new Date(this.endTime).getTime();
    data.duration =
      Math.abs(
        new Date(this.endTime).getTime() - new Date(this.startTime).getTime()
      ) / 36e5;
    data.paymentAmount = this.paymentAmount;

    this.appointmentService.makeAppointment(data).subscribe(res => {
      this.toastrService.success(
        'Hari Bn Ela',
        'Appoinment has been sent to the ' +
          this.professionalName +
          '. We will get back to you'
      );
      this.redirect.navigate(['/home']);
    });
  }

  calculatePayment() {
    this.duration =
      Math.abs(
        new Date(this.endTime).getTime() - new Date(this.startTime).getTime()
      ) / 36e5;
    this.paymentAmount = Number(this.duration) * Number(this.paymentPerHour);
  }
}
