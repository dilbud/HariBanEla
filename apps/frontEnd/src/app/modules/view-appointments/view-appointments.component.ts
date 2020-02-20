import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { AppointmentService } from '../../data/services/appointment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { CategoryService } from '../../data/services/category.service';
import { VerifyProService } from '../../data/services/verify-pro.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/data/services/alert.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface Field {
  value: string;
  viewValue: string;
}

export interface RowData {
  no: string;
  name: string;
  subject: string;
  // date: string;
  email: string;
  row: any;
}

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ViewAppointmentsComponent implements OnInit {
  @Input() user: ServerData;
  List: any[] = [];
  FilterList: any[] = [];
  allUser: any[] = [];
  allAppTable: any[] = [];
  fields: Field[] = [];

  time = 'up';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = [
    'no',
    'name',
    'subject',
    // 'date',
    'email'
  ];

  expandedElement: RowData | null;
  /**
   * @param  {AppointmentService} privateappointmentService
   * @param  {AlertService} privatealertService
   * @param  {UserService} privateuserService
   * @param  {Router} privaterouter
   * @param  {CategoryService} privatecategoryService
   * @param  {VerifyProService} privateverifyProService
   */
  constructor(
    private appointmentService: AppointmentService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private verifyProService: VerifyProService
  ) {}
  /**
   * init set table row
   */
  ngOnInit() {
    if (this.user.userType === 'pro') {
      this.appointmentService
        .getAppointmentByProfessionalId(this.user.id)
        .subscribe(
          result => {
            this.List = result;
          },
          err => {},
          () => {
            this.filter('up');
            this.createTableRow();
          }
        );
    }
    if (this.user.userType === 'gen') {
      this.appointmentService.getAppointmentByUserId(this.user.id).subscribe(
        result => {
          this.List = result;
        },
        err => {},
        () => {
          this.filter('up');
          this.createTableRow();
        }
      );
    }
  }
  /**
   * create table row
   */
  private createTableRow() {
    this.FilterList.forEach((val, index) => {
      console.log(this.fields);
      const single: RowData = {
        no: (index + 1).toString(),
        name: val.professionalName,
        subject: val.subject,
        // date: this.formatDate(val.createdAt.toString()),
        email: val.professionalEmail.toString(),
        row: val
      };
      this.allAppTable.push(single);
    });

    console.log('app', this.allAppTable);
    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
   * @param  {any} val
   * reinit
   */
  reInit(val: any) {
    this.time = val;
    this.FilterList = [];
    this.allAppTable = [];
    this.filter(this.time);
    this.createTableRow();
  }
  /**
   * @param  {any} val
   */
  private filter(val: any) {
    if (val === 'past') {
      this.FilterList = this.List.filter(value => {
        return Date.parse(value.endTime) <= Date.now();
      });
    }
    if (val === 'up') {
      this.FilterList = this.List.filter(value => {
        return Date.parse(value.startTime) >= Date.now();
      });
    }
  }
  /**
   * @param  {Event} event
   */
  /**
   * @param  {Event} event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * @param  {any} val
   * view appointment
   */
  view(val: any) {
    this.router.navigate([`/appointment/${val._id}`]);
    this.reInit(this.time);
  }
  /**
   * @param  {any} val
   * get call
   */
  call(val: any) {
    this.router.navigate([`/chat/${val._id}`]);
    this.reInit(this.time);
  }
  /**
   * @param  {any} val
   * get payment
   */
  payment(val: any) {
    this.router.navigate([`/payment/${val._id}`]);
    this.reInit(this.time);
  }
}
