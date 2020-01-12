import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';

@Component({
  selector: 'app-report-d',
  templateUrl: './report-d.component.html',
  styleUrls: ['./report-d.component.scss']
})
export class ReportDComponent implements OnInit {

  private reportData: ReportData;
  constructor(

    // tslint:disable-next-line: no-shadowed-variable

    public dialogRef: MatDialogRef<ReportDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }
  submit() {
    this.reportData = {
      content: 'dfd',
      name: this.data.user === null ? 'null' : this.data.user.firstName + ' ' + this.data.user.lastName,
      email: this.data.user === null ? 'null' : this.data.user.email,
      type: this.getType() ,
      userId: this.data.user === null ? 'null' : this.data.user.id
    };
    this.dialogRef.close(this.reportData);
  }
  close() {
    this.dialogRef.close(null);
  }

  private getContent() {

  }

  private getType() {
    switch (this.data.path) {
      case 0:
        return 'feedback';
      case 1:
        return 'resetPassword';
      case 2:
        return 'reportPost';
      case 3:
        return 'reportUser';
    }
  }

  public getTitle() {
    switch (this.data.path) {
      case 0:
        return 'feedback service';
      case 1:
        return 'Reset Password';
      case 2:
        return 'Report Post';
      case 3:
        return 'Report User';
    }
  }

}
