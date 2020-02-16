import { } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { CategoryService } from '../../data/services/category.service';
import { VerifyProService } from '../../data/services/verify-pro.service';
import { ServerData } from '../../data/models/serverData';
import { Router } from '@angular/router';
import { AlertService } from 'app/data/services/alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { QuestionService } from '../../data/services/question.service';

export interface Field {
  value: string;
  viewValue: string;
}

export interface RowData {
  no: string;
  cat: string;
  title: string;
  date: string;
  row: any;
}

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewQuestionsComponent implements OnInit {

  @Input() user: ServerData;
  list: any;
  sorted: any[] = [];
  allUserTable: any[] = [];
  fields: Field[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'cat', 'title', 'date'];
  expandedElement: RowData | null;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private categoryService: CategoryService,
    private verifyProService: VerifyProService
  ) { }

  ngOnInit() {
    this.questionService.getQuestionsOfUser(this.user.id).subscribe(
      result => {
        this.list = result;
      },
      err => { },
      () => {
        this.sorted = this.list.sort((a: any, b: any) => {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });
        this.sorted.forEach((val, index) => {
          console.log(this.fields);
          let singleUser: RowData = {
            no: (index + 1).toString(),
            cat: val.category,
            title: val.title ,
            date: this.formatDate(val.createdAt.toString()),
            row: val
          };
          this.allUserTable.push(singleUser);
        });
        this.dataSource = new MatTableDataSource(this.allUserTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  formatDate(date: string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
            day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  view(item: any) {
    this.router.navigate([`/questions/${item._id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}









export class VerificationsComponent implements OnInit {







  ngOnInit() {

  }





}
