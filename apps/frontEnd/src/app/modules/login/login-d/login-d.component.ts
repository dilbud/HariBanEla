import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-d',
  templateUrl: './login-d.component.html',
  styleUrls: ['./login-d.component.scss']
})
export class LoginDComponent implements OnInit, OnDestroy {
  login: FormGroup;
  lock = true; // disable on destroy
  /**
   * @param  {FormBuilder} privateformBuilder
   * @param  {MatDialogRef<LoginDComponent>} publicdialogRef
   * @param  {} @Inject(MAT_DIALOG_DATA
   * @param  {DialogData} publicdata
   */
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  /**
   * initialize form validation
   */
  ngOnInit() {
    this.login = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required, Validators.email]],
      Ctrl_2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  /**
   * when component destroy
   * close dialog and pass data to parent component
   */
  ngOnDestroy() {
    if (this.lock) {
      // disable on destroy
      this.dialogRef.close('close');
    }
  }
  /**
   * check validation and
   * close dialog and pass data to parent component
   */
  send() {
    if (this.login.valid) {
      this.lock = false;
      this.data.email = this.login.value.Ctrl_1;
      this.data.password = this.login.value.Ctrl_2;
      this.dialogRef.close(this.data);
    } else {
      this.lock = true;
      this.dialogRef.close('close');
    }
  }
  /**
   * close dialog and pass data to parent component
   */
  google() {
    this.lock = false;
    this.dialogRef.close('google');
  }
  /**
   * close dialog and pass data to parent component
   */
  facebook() {
    this.lock = false;
    this.dialogRef.close('facebook');
  }
}
