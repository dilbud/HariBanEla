import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent implements OnInit {
  private reportData: ReportData;
  reportUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.reportUser = this.formBuilder.group({
      Ctrl_1: [null, [Validators.required]]
    });
  }

  submit() {
    this.reportData = {
      content: this.getContent(),
      name: this.getName(),
      email: this.getEmail(),
      type: 'reportUser',
      userId: this.getUserId(),
      reportedPostId: this.data.reportedPostId,
      reportedUserId: this.data.reportedUserId,
      reportedUserName: this.data.reportedUserName
    };
    this.dialogRef.close(this.reportData);
  }
  close() {
    this.dialogRef.close(null);
  }
  private getContent(): string {
    return this.reportUser.value.Ctrl_1;
  }
  private getName(): string {
    if (this.data.user === null) {
      return 'null';
    } else {
      return this.data.user.firstName + ' ' + this.data.user.lastName;
    }
  }
  private getEmail(): string {
    if (this.data.user === null) {
      return 'null';
    } else {
      return this.data.user.email;
    }
  }
  private getUserId(): string {
    if (this.data.user === null) {
      return 'null';
    } else {
      return this.data.user.id;
    }
  }
}
