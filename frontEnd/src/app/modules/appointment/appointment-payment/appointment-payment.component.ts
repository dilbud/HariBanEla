import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/data/services/appointment.service';
import { ToastrService } from 'ngx-toastr';


declare var paypal;

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.scss']
})
export class AppointmentPaymentComponent implements OnInit {
  public appointmentId: string
  public professionalId: String
  public professionalPhoto:string
  public professionalName: string
  public userName: string
  public userId: string
  public subject: string
  public description: string
  public startTime: Date
  public duration: Number
  public endTime: Date
  public paymentStatus:string
  public paymentAmount: Number

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  /**
   * @param  {AppointmentService} privateappointmentService
   * @param  {Router} privateredirect
   * @param  {ActivatedRoute} privateroute
   * @param  {ToastrService} privatetoastrService
   */
  constructor(private appointmentService: AppointmentService, private redirect: Router, private route: ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit() {
    this.professionalPhoto='https://lh4.googleusercontent.com/-yUG1fx5VXbY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdn62LesVDBvcpG1PFEv7aAuxByWg/s96-c/photo.jpg'
    this.appointmentId = this.route.snapshot.params.id;
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(res => {
      this.professionalId=res.professionalId
      this.professionalName=res.professionalName
      this.userId = res.userId
      this.userName = res.userName
      this.subject = res.subject
      this.description = res.description
      this.startTime = res.startTime
      this.duration = res.duration
      this.endTime = res.endTime
      this.paymentStatus=res.paymentStatus
      this.paymentAmount=res.paymentAmount
    },
      err => {
        console.log(err);
      })


      paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Appointment with'+this.professionalName,
                amount: {
                  currency_code: 'USD',
                  value: this.paymentAmount
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          var body;
          body.paymentStatus='Paid'
          this.appointmentService.paymentAppointment(this.appointmentId,body).subscribe(res=>{
            if(res.paymentStatus=='Paid'){
              this.toastrService.success('Hari Bn Ela', 'Payment has been made sucessfully. Check your email for the communication portal link');
              this.redirect.navigate(['/profile']);
            }
          })
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
