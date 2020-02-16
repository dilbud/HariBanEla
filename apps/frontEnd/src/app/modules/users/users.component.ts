import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { AlertService } from '../../data/services/alert.service';
import { Router } from '@angular/router';
import { EdService } from '../../data/services/ed.service';
import { ServerData } from 'app/data/models/serverData';
import { CategoryService } from 'app/data/services/category.service';

export interface RowData {
  no: string;
  name: string;
  type: string;
  cat: string;
  rate: string;
  state: string;
  row: any;
}

export interface UserType {
  value: string;
  viewValue: string;
}
export interface Field {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  current: ServerData;
  allUser: any[] = [];
  allUserTable: any[] = [];
  fields: Field[] = [];

  displayedColumns: string[] = ['no', 'name', 'type', 'cat', 'rate', 'state', 'id'];
  userTypes: UserType[] = [
    {value: 'admin' , viewValue: 'Administrator'},
    {value: 'gen' , viewValue: 'General'},
    {value: 'pro' , viewValue: 'Professional'}
  ];
  dataSource: MatTableDataSource<RowData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private edService: EdService,
    private categoryService: CategoryService,
  ) {}
  ngOnInit() {
    this.current = this.userService.getUserData();
    this.reCall();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  view(val: any) {
    this.router.navigate(['../view'], { queryParams: { id: val._id, type: val.userType } });
  }
  change(val: any) {

    if (!(this.current.id === val._id)) {
      if (val.active === true) {
        this.edService.disableUser(val._id);
      } else {
        this.edService.enableUser(val._id);
      }
      this.allUser  = [];
      this.allUserTable = [];

      this.reCall();
    } else {
      this.alertService.setAlert('Can not Disable Current User');
      this.alertService.showAlert();
    }
  }

  reCall() {

    this.allUser = [];
    this.allUserTable = [];
    this.fields = [];
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
        let res: any;
        this.userService.getAllUser().subscribe(
          response => {
            res = response;
            console.log(res);
          },
          error => {
            this.alertService.setAlert(error.error.msg);
            this.alertService.showAlert();
          },
          () => {
            console.log(this.fields,'jhdfjhsdfhds');
            this.allUser = res.serverData;
            this.allUser.forEach((val, index) => {
              let singleUser: RowData = {
                no: (index + 1 ).toString(),
                name: val.firstName + ' ' + val.lastName,
                type: this.userTypes.filter((item: UserType) => (item.value === val.userType)).map((item: UserType) => item.viewValue)[0],
                cat: this.fields.filter((item: Field) => (item.value === val.category)).map((item: Field) => item.viewValue)[0],
                rate: val.rate.toString(),
                state:  val.active === true ? 'Enabled' : 'Disabled',
                row: val
              };
              this.allUserTable.push(singleUser);
            });
            this.dataSource = new MatTableDataSource(this.allUserTable);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        );

      });
  }
}
