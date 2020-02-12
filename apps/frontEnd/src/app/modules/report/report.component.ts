import { Component, OnInit, Input } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReportPostComponent } from './report-post/report-post.component';
import { ReportUserComponent } from './report-user/report-user.component';
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
  private user = null;
  public isAuth = false;

  constructor(
    private feedbackDialog: MatDialog,
    private resetPasswordDialog: MatDialog,
    private reportUserDialog: MatDialog,
    private reportPostDialog: MatDialog,
    private reportService: ReportService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.isAuth = this.userService.getIsAuth();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.user = this.userService.getUserData();
      this.isAuth = isAuth;
    });
  }

  feedback(): void {
    const feedbackDialogRef = this.feedbackDialog.open(FeedbackComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
      }
    });

    feedbackDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportData = result;
        this.reportService.sendFeedBack(this.reportData);
      }
    });
  }

  resetPassword(): void {
    const resetPasswordDialogRef = this.resetPasswordDialog.open(ResetPasswordComponent, {
      width: '400px', height: '30em',
      data: {
        path: this.path,
       }
    });

    resetPasswordDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportData = result;
        this.reportService.sendResetPassword(this.reportData);
      }
    });
  }

  reportPost(): void {
    const reportPostDialogRef = this.reportPostDialog.open(ReportPostComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
       }
    });

    reportPostDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportService.sendReportPost(result);
      }
    });
  }
  reportUser(): void {
    const reportUserDialogRef = this.reportUserDialog.open(ReportUserComponent, {
      width: '500px',
      data: {
        path: this.path,
        user: this.user === null ? null : this.user,
       }
    });

    reportUserDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reportService.sendReportUser(result);
      }
    });
  }

}
