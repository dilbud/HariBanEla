import { Component, OnInit, Input } from '@angular/core';
import { ReportDComponent } from './report-d/report-d.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() path: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  feedback(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  resetPassword(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  reportPost(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }
  reportUser(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  reportSystem(): void {
    const dialogRef = this.dialog.open(ReportDComponent, {
      width: '500px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }




}
