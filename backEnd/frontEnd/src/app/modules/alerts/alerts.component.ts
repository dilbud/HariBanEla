import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../../data/services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  message = 'login success';
  action = 'ok';

  constructor(
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 0,
    });
  }

}
