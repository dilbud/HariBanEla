import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'app/data/models/reportData';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  private reportData: ReportData;
  feedback: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
    this.feedback = this.formBuilder.group({
      Ctrl_1: [ this.data.user === null ? '' : this.data.user.firstName + ' ' + this.data.user.lastName , [Validators.required]],
      Ctrl_2: [ this.data.user === null ? '' : this.data.user.email , [Validators.required, Validators.email]],
      Ctrl_3: ['', [Validators.required]]
    });
  }


  submit() {

    if (this.feedback.valid) {
      this.reportData = {
        content: this.getContent(),
        name: this.getName(),
        email: this.getEmail(),
        type: 'feedback' ,
        userId: this.getUserId(),
      };
      this.dialogRef.close(this.reportData);
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  private getContent(): string {
    return this.feedback.value.Ctrl_3;
  }

  private getName(): string {
    if (this.data.user === null) {
      return this.feedback.value.Ctrl_1;
    } else {
      return this.data.user.firstName + ' ' + this.data.user.lastName;
    }
  }

  private getEmail(): string {
    if (this.data.user === null) {
      return this.feedback.value.Ctrl_2;
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
