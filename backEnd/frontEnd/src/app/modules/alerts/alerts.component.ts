import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  message = 'login success';
  action = 'ok';

  // tslint:disable-next-line: variable-name
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.openSnackBar(this.message , this.action);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 0,
    });
  }

}
