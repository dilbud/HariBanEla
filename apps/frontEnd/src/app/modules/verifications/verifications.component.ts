import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { CategoryService } from '../../data/services/category.service';
import { VerifyProService } from '../../data/services/verify-pro.service';
import { ServerData } from '../../data/models/serverData';
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
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VerificationsComponent implements OnInit {

  allUser: any[] = [];
  allUserTable: any[] = [];
  fields: Field[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'cat', 'email'];
  expandedElement: RowData | null;


  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private verifyProService: VerifyProService
  ) { }

  ngOnInit() {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  accept(val: any) {
    this.verifyProService.acceptPro(val._id);
    this.ngOnInit();
  }

  reject(val: any) {
    this.verifyProService.rejectPro(val._id);
    this.ngOnInit();
  }

}
