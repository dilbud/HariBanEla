import { Component, OnInit } from '@angular/core';
import { ReportDComponent } from './report-d/report-d.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  report(): void {
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
