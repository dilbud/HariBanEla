import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { CategoryService } from '../../data/services/category.service';
import { ServerData } from '../../data/models/serverData';
import { Router } from '@angular/router';
import { AlertService } from 'app/data/services/alert.service';

export interface RowData {
  no: string;
  name: string;
  cat: string;
  email: string;
  row: any;
}

export interface Field {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {

  allUser: any[] = [];
  allUserTable: any[] = [];
  displayedColumns: string[] = ['no', 'name', 'cat', 'email', 'id'];
  fields: Field[] = [];

  dataSource: MatTableDataSource<RowData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
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
        this.dataSource = new MatTableDataSource(this.allUserTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

}
