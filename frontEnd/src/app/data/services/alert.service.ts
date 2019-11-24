// public method
// setAlert(string)
// showAlert(void);
// import { AlertService } from './alert.service' to use
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private action = 'ok';
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(private snackBar: MatSnackBar) {}
  private alert: string[] = [];

  private pushAlert(alert: string): void {
    this.alert.push(alert);
  }
  private popAlert(): string {
    if (this.alert.length !== 0) {
      return this.alert.shift();
    } else {
      return null;
    }
  }
  public showAlert(): void {
    const alert = this.popAlert();
    if (alert === null) {
      return;
    }
    this.snackBarRef = this.openSnackBar(alert, this.action);
    this.snackBarRef.onAction().subscribe(() => {
      this.snackBarRef.dismiss();
    });
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.showAlert();
    });
  }

  public setAlert(alert: string): void {
    this.pushAlert(alert);
  }

  private openSnackBar(message: string, action: string): any {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
