import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-d',
  templateUrl: './report-d.component.html',
  styleUrls: ['./report-d.component.scss']
})
export class ReportDComponent implements OnInit {

  constructor(

    // tslint:disable-next-line: no-shadowed-variable

    public dialogRef: MatDialogRef<ReportDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aa: 'dfw'}) {}

  ngOnInit() {
  }
  submit() {
    this.dialogRef.close(null);
  }
  close() {
    this.dialogRef.close(null);
  }

}
