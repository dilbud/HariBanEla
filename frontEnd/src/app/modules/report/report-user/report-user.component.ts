import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';


@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent implements OnInit {

  private reportData: ReportData;

  constructor(
    public dialogRef: MatDialogRef<ReportUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
  }

  submit() {
    this.reportData = {
      content: this.getContent(),
      name: this.getName(),
      email: this.getEmail(),
      type: 'reportUser' ,
      userId: this.getUserId(),
    };
    this.dialogRef.close(this.reportData);
  }
  close() {
    this.dialogRef.close(null);
  }
  private getContent(): string {
    return 'dfd';
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
