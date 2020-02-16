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
    id: string;
  }

  @Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })

  export class CategoryComponent implements OnInit {

    row: RowData[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataSource: MatTableDataSource<RowData>;
    columnsToDisplay = ['no', 'name'];
    expandedElement: RowData | null;

    constructor(
      private alertService: AlertService,
      private userService: UserService,
      private router: Router,
      private categoryService: CategoryService,
      private verifyProService: VerifyProService,
    ) { }

    ngOnInit() {
      let res: Field[];
      this.categoryService.getAllCategories().subscribe(
        result => {
          res = result;
        },
        err => {
        },
        () => {
          const arryList: RowData[] = res.map((v: any, index: number) => {
            return {
              no: (index + 1).toString(),
              id: v._id,
              name: v.name,
            };
          });
          this.row = arryList;
          this.dataSource = new MatTableDataSource(this.row);
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

    addCategory(val: any) {
      if (val === '') {
        this.alertService.setAlert('Can not set empty category');
        this.alertService.showAlert();
        return;
      }
      const data = {name: val}
      this.categoryService.addCategory(data).subscribe(res => {
        console.log(res);
      });
      this.ngOnInit();
    }

    updateCategory(val: any, id: any) {
      if (val === '') {
        this.alertService.setAlert('Can not set empty category');
        this.alertService.showAlert();
        return;
      }
      const data = {name: val}
      this.categoryService.updateCategoryById(id, data).subscribe(res => {
        console.log(res);
      });
      this.ngOnInit();
    }

  }

