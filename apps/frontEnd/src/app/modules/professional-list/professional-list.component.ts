import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges
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

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.proList = [];
    this.filteredList = [];
    this.allUserTable = [];

    this.categoryService.getAllCategories().subscribe(
      val => {
        const arryList: any = val.map((v: any) => {
          return {
            value: v._id,
            viewValue: v.name
          };
        });
        this.fields = arryList;
        this.fields.push({ value: 'all', viewValue: 'All' });
      },
      err => {},
      () => {}
    );

    this.category = this.formBuilder.group({
      Ctrl_1: ['all', [Validators.required]]
    });

    let res: any;
    this.userService.getProList().subscribe(
      response => {
        res = response;
      },
      error => {
        this.alertService.setAlert('Something wrong !');
        this.alertService.setAlert(error.error.msg);
        this.alertService.showAlert();
      },
      () => {
        this.proList = res.serverData;
        this.filteredList = this.proList;
      }
    );
  }

  onChange() {
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

    this.dataSource = new MatTableDataSource(this.allUserTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(item: any) {
    this.router.navigate(['./account'], {
      queryParams: { id: item._id, type: item.userType }
    });
  }
}
