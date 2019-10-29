import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../data/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  isLinear = false;
  // formName: FormGroup;
  // formAddress: FormGroup;
  formEmail: FormGroup;
  formPassword: FormGroup;
  email = '';
  pass = '';


  constructor(private _formBuilder: FormBuilder, public UserService: UserService) {}

  ngOnInit() {
    // this.formName = this._formBuilder.group({
    //   Ctrl_1: ['', Validators.required]
    // });
    // this.formAddress = this._formBuilder.group({
    //   Ctrl_1: ['', Validators.required]
    // });
    this.formEmail = this._formBuilder.group({
      Ctrl_1: []
    });
    this.formPassword = this._formBuilder.group({
      Ctrl_2: []
    });
  }

  submit(f : any) {
    console.dir(f);
    alert(this.formEmail.value.email + ' ' + this.formPassword.value.password);
    this.UserService.createUser(this.formEmail.value.email, this.formPassword.value.password);
  }
}

