import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../data/services/user.service';
import { UserData } from '../../data/models/userData';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{


  isLinear = false;
  formName: FormGroup;
  formAddress: FormGroup;
  formEmail: FormGroup;
  formPassword: FormGroup;
  formUserType: FormGroup;
  private user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener()
    .subscribe( (isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
    this.formName = this.formBuilder.group({
      Ctrl_1: [this.user.firstName, [Validators.required]],
      Ctrl_2: [this.user.lastName, [Validators.required]]
    });
    this.formAddress = this.formBuilder.group({
      Ctrl_1: [this.user.address, [Validators.required]]
    });
    this.formEmail = this.formBuilder.group({
      Ctrl_1: [{value: this.user.email , disabled: true}, [Validators.required, Validators.email]]
    });
    this.formPassword = this.formBuilder.group({
      Ctrl_1: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
    this.formUserType = this.formBuilder.group({
      Ctrl_1: [this.user.userType, [Validators.required]]
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
      this.userService.updateUser(data);
    } else {
      alert('submission fail');
    }
  }
}
