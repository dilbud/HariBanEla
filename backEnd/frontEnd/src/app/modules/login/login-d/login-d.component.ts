import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../data/services/user.service';


interface DialogData {
  email: string;
  password: string;
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
    public UserService: UserService,
    public dialogRef: MatDialogRef<LoginDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close(null);
    }

  ngOnInit() {
    this.login = this.formBuilder.group({
      Ctrl_1: ['email@email.com', [Validators.required, Validators.email]],
      Ctrl_2: ['ggggggggggggggg', [Validators.required, Validators.minLength(8)]]
    });
  }

  send(): DialogData {
    if(this.login.valid){
      this.data.email = this.login.value.Ctrl_1;
      this.data.password = this.login.value.Ctrl_2;
      return this.data;
    } else {
      return null;
    }
  }


}
