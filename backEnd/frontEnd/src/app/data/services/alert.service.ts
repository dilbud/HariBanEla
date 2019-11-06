import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private action = 'ok';

  constructor(
    private snackBar: MatSnackBar
  ) {}
  alert: string[] = [];

  pushAlert(alert: string): void {
    this.alert.push(alert);
  }
  popAlert(): string {
    return this.alert.pop();
  }
  showAlert(): string {
    return this.popAlert();
  }
  setAlert(alert: string): void {
    this.openSnackBar(alert, this.action);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 0,
    });
  }
}
