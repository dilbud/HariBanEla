import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../data/services/user.service';
import { ReportService } from '../../data/services/report.service';
import { VerifyProService } from '../../data/services/verify-pro.service';
import { ServerData } from '../../data/models/serverData';
import { Router } from '@angular/router';
import { AlertService } from 'app/data/services/alert.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface RowData {
  no: string;
  name: string;
  email: string;
  row: any;
}

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss'],
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
export class ViewFeedbackComponent implements OnInit {
  row: RowData[] = [];
  allReport: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'email'];
  expandedElement: RowData | null;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private reportService: ReportService,
    private verifyProService: VerifyProService
  ) {}

  ngOnInit() {
    this.row = [];
    let res: any;
    this.reportService.getFeedBack().subscribe(
      result => {
        res = result;
      },
      err => {},
      () => {
        this.allReport = res.serverData;
        this.allReport.forEach((val, index) => {
          let singleUser: RowData = {
            no: (index + 1).toString(),
            name: val.name,
            email: val.email,
            row: val
          };
          this.row.push(singleUser);
        });
        this.dataSource = new MatTableDataSource(this.row);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: any) {
    console.log(id);
    this.reportService.deleteFeedBack(id);
    this.ngOnInit();
  }
}
