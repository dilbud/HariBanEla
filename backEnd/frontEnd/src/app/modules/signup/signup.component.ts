import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../data/services/user.service';
import { UserData } from '../../data/models/userData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLinear = false;
  formName: FormGroup;
  formAddress: FormGroup;
  formEmail: FormGroup;
  formPassword: FormGroup;
  formUserType: FormGroup;
  email = '';
  pass = '';

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: no-shadowed-variable
    public UserService: UserService
  ) {}

  ngOnInit() {
    this.formName = this.formBuilder.group({
      Ctrl_1: ['Dilan', [Validators.required]],
      Ctrl_2: ['Buddika', [Validators.required]]
    });
    this.formAddress = this.formBuilder.group({
      Ctrl_1: ['address', [Validators.required]]
    });
    this.formEmail = this.formBuilder.group({
      Ctrl_1: [{value: 'abuddikahgd@gmail.com' , disabled: true}, [Validators.required, Validators.email]]
    });
    this.formPassword = this.formBuilder.group({
      Ctrl_1: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
    this.formUserType = this.formBuilder.group({
      Ctrl_1: ['user', [Validators.required]]
    });
  }

  submit() {
    if (
      this.formName.valid &&
      this.formAddress.valid &&
      // this.formEmail.valid &&
      this.formPassword.valid &&
      this.formUserType
    ) {
      const firstName = this.formName.value.Ctrl_1;
      const lastName = this.formName.value.Ctrl_2;
      const address = this.formAddress.value.Ctrl_1;
      const email = this.formEmail.value.Ctrl_1;
      const password = this.formPassword.value.Ctrl_1;
      const userType = this.formUserType.value.Ctrl_1;
      const picURL = 'null';

      const data: UserData = {
        firstName,
        lastName,
        address,
        email,
        password,
        picURL,
        userType
      };
      this.UserService.updateUser(data);
    } else {
      alert('submission fail');
    }
  }
}
