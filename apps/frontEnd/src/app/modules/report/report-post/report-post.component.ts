import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.scss']
})
export class ReportPostComponent implements OnInit {
  private reportData: ReportData;
  reportPost: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.reportPost = this.formBuilder.group({
      Ctrl_1: [null, [Validators.required]]
    });
  }

  submit() {
    this.reportData = {
      content: this.getContent(),
      name: this.getName(),
      email: this.getEmail(),
      type: 'reportPost',
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
    return this.reportPost.value.Ctrl_1;
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
