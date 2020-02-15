import { Component, OnInit, ViewChild , Input} from '@angular/core';
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
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface Field {
  value: string;
  viewValue: string;
}

export interface RowData {
  no: string;
  name: string;
  cat: string;
  email: string;
  row: any;
}

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ViewAppointmentsComponent implements OnInit {

  @Input() user: ServerData;
  List: any[] = [];
  FilterList: any[] = [];
  allUser: any[] = [];
  allUserTable: any[] = [];
  fields: Field[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'cat', 'email'];
  expandedElement: RowData | null;

  constructor(
    private appointmentService: AppointmentService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private verifyProService: VerifyProService
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

    let res1: any;
    this.categoryService.getAllCategories().subscribe(
      result => {
        res1 = result;
      },
      err => {
      },
      () => {
        const arryList: any = res1.map((v: any) => {
          return {
            value: v._id,
            viewValue: v.name,
          };
        });
        this.fields = arryList;
        let res2: any;
        this.userService.getAllPendingUser().subscribe(
          response => {
            res2 = response;
          },
          error => {
            this.alertService.setAlert(error.error.msg);
            this.alertService.showAlert();
          },
          () => {
            this.allUser = res2.serverData;
            this.allUser.forEach((val, index) => {
              console.log(this.fields);
              let singleUser: RowData = {
                no: (index + 1).toString(),
                name: val.firstName + ' ' + val.lastName,
                cat: this.fields.filter((item: Field) => (item.value === val.category)).map((item: Field) => item.viewValue)[0],
                email: val.email.toString(),
                row: val
              };
              this.allUserTable.push(singleUser);
            });
            this.dataSource = new MatTableDataSource(this.allUserTable);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      });


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  accept(val: any) {
    this.verifyProService.acceptPro(val._id);
    console.log(val);
    this.ngOnInit();
  }

  reject(val: any) {
    this.verifyProService.rejectPro(val._id);
    console.log(val);
  }
}
