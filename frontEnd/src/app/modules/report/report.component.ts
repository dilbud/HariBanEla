import { Component, OnInit, Input } from '@angular/core';
import { ReportDComponent } from './report-d/report-d.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '../../data/services/report.service';
import { ReportData } from '../../data/models/reportData';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() path: number;
  private reportData: ReportData;
  private user = this.userService.getUserData();
  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private userService: UserService,
    ) { }

  ngOnInit() {
  }

  feedback(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reportData = result;
      if (result != null) {
        this.reportService.sendFeedBack(result);
      }
    });
  }

  resetPassword(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '400px', height: '30em',
      data: {
        path: this.path,
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportService.sendResetPassword(result);
      }
    });
  }

  reportPost(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportService.sendReportPost(result);
      }
    });
  }
  reportUser(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportService.sendReportUser(result);
      }
    });
  }

}
