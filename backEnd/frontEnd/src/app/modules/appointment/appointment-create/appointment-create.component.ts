import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {

  public professionalId: String
  public professionalName: string
  public professionalPhoto:string
  public userName: string
  public userId: string
  public subject: string
  public description: string
  public startTime: Date
  public duration: Number
  public endTime: Date
  public paymentPerHour:Number
  public paymentAmount: Number
  public appointmentForm: FormGroup;


  constructor(private appointmentService: AppointmentService, private redirect: Router, private toastrService: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.professionalPhoto='https://lh4.googleusercontent.com/-yUG1fx5VXbY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdn62LesVDBvcpG1PFEv7aAuxByWg/s96-c/photo.jpg'
    this.paymentPerHour=1000
    this.professionalName="the xhax"
    this.duration=0
    // this.paymentAmount=0
    this.paymentAmount=0
    this.appointmentService.currentProfessionalId.subscribe(res => {
      this.professionalId = res;
      // get the this.professional name form the user service
      // get the this.paymentPerHour from the user service
    },
      err => {
        console.log(err);
      })

    this.appointmentForm = this.formBuilder.group({
      subject: [null, Validators.required],
      description: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      });
  }

  makeAppointment(form: NgForm) {
    var data: any;
    data.professionalId = this.professionalId
    data.professionalName = this.professionalName
    // data.userId= get from the localStorage
    // data.userName= get from the localStorage
    data.subject = this.subject
    data.description = this.description
    data.startTime = new Date(this.startTime).getTime();
    data.endTime = new Date(this.endTime).getTime();
    data.duration =Math.abs((new Date(this.endTime).getTime() - new Date(this.startTime).getTime())) / 36e5;
    data.paymentAmount = this.paymentAmount;

    this.appointmentService.makeAppointment(data).subscribe(res => {
      this.toastrService.success('Hari Bn Ela', 'Appoinment has been sent to the' + this.professionalName + '. We will get back to you');
      this.redirect.navigate(['/home']);
    })

  }

  calculatePayment(){
    this.duration= Math.abs((new Date(this.endTime).getTime() - new Date(this.startTime).getTime())) / 36e5;
    this.paymentAmount= Number(this.duration) *Number(this.paymentPerHour)
  }

}
