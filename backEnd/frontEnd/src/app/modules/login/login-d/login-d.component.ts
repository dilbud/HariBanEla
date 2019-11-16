import { Component, OnInit, Inject } from '@angular/core';
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
export class LoginDComponent implements OnInit {
  login: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: no-shadowed-variable
    public dialogRef: MatDialogRef<LoginDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      Ctrl_1: ['buddikahgd@gmail.com', [Validators.required, Validators.email]],
      Ctrl_2: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
  }

  send() {
    if (this.login.valid) {
      this.data.email = this.login.value.Ctrl_1;
      this.data.password = this.login.value.Ctrl_2;
      console.log('jjjjjjjjj');
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close(null);
    }
  }
  google() {
    console.log('44444444444');
    this.dialogRef.close('google');
  }

  facebook() {
    console.log('555555555555');
    this.dialogRef.close('facebook');
  }
}
