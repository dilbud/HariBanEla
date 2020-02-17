import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private reportData: ReportData;
  reset: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.reset = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.reset.valid) {
      this.reportData = {
        content: 'null',
        name: 'null',
        email: this.reset.value.Ctrl_1,
        type: 'resetPassword',
        userId: 'null',
        reportedPostId: 'null',
        reportedUserId: 'null',
        reportedUserName: 'null'
      };
      this.dialogRef.close(this.reportData);
    }
  }
  close() {
    this.dialogRef.close(null);
  }
}
