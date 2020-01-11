import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DialogData {
  email: string;
  password: string;
  type: number;
}

@Component({
  selector: 'app-login-d',
  templateUrl: './login-d.component.html',
  styleUrls: ['./login-d.component.scss']
})
export class LoginDComponent implements OnInit, OnDestroy {
  login: FormGroup;
  lock = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.login = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required, Validators.email]],
      Ctrl_2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnDestroy() {
    if (this.lock) {
      this.dialogRef.close('close');
    }
  }

  send() {
    if (this.login.valid) {
      this.data.email = this.login.value.Ctrl_1;
      this.data.password = this.login.value.Ctrl_2;
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(null);
    }
  }
  google() {
    this.lock = false;
    this.dialogRef.close('google');
  }

  facebook() {
    this.lock = false;
    this.dialogRef.close('facebook');
  }
}
