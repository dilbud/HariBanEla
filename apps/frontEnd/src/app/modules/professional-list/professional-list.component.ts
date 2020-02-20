import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import { ServerData } from '../../data/models/serverData';
import { UserService } from '../../data/services/user.service';
import { AlertService } from 'app/data/services/alert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/data/services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Field {
  value: string;
  viewValue: string;
}

export interface RowData {
  no: string;
  name: string;
  cat: string;
  rate: string;
  row: any;
}

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {
  category: FormGroup;

  proList: ServerData[] = null;
  filteredList: ServerData[] = null;

  fields: Field[] = null;
  allUserTable: any[] = [];

  displayedColumns: string[] = ['no', 'name', 'cat', 'rate', 'id'];
  dataSource: MatTableDataSource<RowData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * @param  {CategoryService} privatecategoryService
   * @param  {FormBuilder} privateformBuilder
   * @param  {UserService} privateuserService
   * @param  {AlertService} privatealertService
   * @param  {Router} privaterouter
   * @param  {ChangeDetectorRef} privatechangeDetectorRefs
   */

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /**
   * when component init filter all professional
   */
  ngOnInit() {
    this.proList = [];
    this.filteredList = [];
    this.allUserTable = [];
    let res1: any;
    this.category = this.formBuilder.group({
      Ctrl_1: ['all', [Validators.required]]
    });

    this.categoryService.getAllCategories().subscribe(
      val => {
        res1 = val;
      },
      err => {},
      () => {
        const arryList: any = res1.map((v: any) => {
          return {
            value: v._id,
            viewValue: v.name
          };
        });
        this.fields = arryList;
        this.fields.push({ value: 'all', viewValue: 'All' });
        let res2: any;
        this.userService.getProList().subscribe(
          response => {
            res2 = response;
          },
          error => {
            this.alertService.setAlert('Something wrong !');
            this.alertService.setAlert(error.error.msg);
            this.alertService.showAlert();
          },
          () => {
            this.proList = res2.serverData;
            this.proList.forEach((val, index) => {
              const singleUser: RowData = {
                no: (index + 1).toString(),
                name: val.firstName + ' ' + val.lastName,
                cat: this.fields
                  .filter((item: Field) => item.value === val.category)
                  .map((item: Field) => item.viewValue)[0],
                rate: val.rate.toString(),
                row: val
              };
              this.allUserTable.push(singleUser);
            });
            console.log('pro tab ', this.allUserTable);
            this.dataSource = new MatTableDataSource(this.allUserTable);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        );
      }
    );
  }

  /**
   * when select change filter professional
   */
  onChange() {
    this.allUserTable = [];
    if (this.category.value.Ctrl_1 === 'all') {
      this.filteredList = this.proList.filter(val => {
        return val.active;
      });
    } else {
      this.filteredList = this.proList.filter(val => {
        return val.category === this.category.value.Ctrl_1 && val.active;
      });
    }

    if (this.filteredList.length === 0) {
      this.alertService.setAlert('professionals not available');
      this.alertService.showAlert();
    }
    this.filteredList.forEach((val, index) => {
      const singleUser: RowData = {
        no: (index + 1).toString(),
        name: val.firstName + ' ' + val.lastName,
        cat: this.fields
          .filter((item: Field) => item.value === val.category)
          .map((item: Field) => item.viewValue)[0],
        rate: val.rate.toString(),
        row: val
      };
      this.allUserTable.push(singleUser);
    });
    this.dataSource = new MatTableDataSource(this.allUserTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.markForCheck();
  }

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
   * @param  {any} item
   */
  view(item: any) {
    this.router.navigate(['../view'], {
      queryParams: { id: item._id, type: item.userType }
    });
  }
}
