import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../data/services/user.service';
import { UserData } from '../../data/models/userData';
import { CategoryService } from 'app/data/services/category.service';

export interface Field {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  isLinear = true;
  formName: FormGroup;
  formAddress: FormGroup;
  formEmail: FormGroup;
  formPassword: FormGroup;
  formUserType: FormGroup;
  formUserProCat: FormGroup;
  formUserProAmount: FormGroup;
  private user: any = null;

  fields: Field[] = null;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });

    this.categoryService.getAllCategories().subscribe(val => {
      const arryList: any = val.map((v: any) => {
        return {
          value: v._id,
          viewValue: v.name
        };
      });
      this.fields = arryList;
    });

    this.formName = this.formBuilder.group({
      Ctrl_1: [this.user.firstName, [Validators.required]],
      Ctrl_2: [this.user.lastName, [Validators.required]]
    });
    this.formAddress = this.formBuilder.group({
      Ctrl_1: [
        this.user.address === 'null' ? '' : this.user.address,
        [Validators.required]
      ]
    });
    this.formEmail = this.formBuilder.group({
      Ctrl_1: [{ value: this.user.email, disabled: true }, [Validators.email]]
    });
    this.formPassword = this.formBuilder.group({
      Ctrl_1: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
    this.formUserType = this.formBuilder.group({
      Ctrl_1: [this.user.userType, [Validators.required]]
    });
    this.formUserProCat = this.formBuilder.group({
      Ctrl_1: [
        {
          value:
            this.user.userType === 'pro'
              ? this.user.category
              : this.user.category,
          disabled: this.user.userType === 'pro' ? false : true
        },
        [Validators.required]
      ]
    });
    this.formUserProAmount = this.formBuilder.group({
      Ctrl_1: [
        {
          value:
            this.user.userType === 'pro'
              ? this.user.paymentPerHour
              : this.user.paymentPerHour,
          disabled: this.user.userType === 'pro' ? false : true
        },
        [Validators.required]
      ]
    });
    this.onChange();
  }

  onChange() {
    this.formUserType.get('Ctrl_1').valueChanges.subscribe(val => {
      if (val === 'pro') {
        this.formUserProCat.get('Ctrl_1').enable();
        this.formUserProAmount.get('Ctrl_1').enable();
        this.formUserProCat.get('Ctrl_1').setValue(this.user.category);
        this.formUserProAmount.get('Ctrl_1').setValue(this.user.paymentPerHour);
      } else {
        this.formUserProCat.get('Ctrl_1').disable();
        this.formUserProAmount.get('Ctrl_1').disable();
        this.formUserProCat.get('Ctrl_1').setValue('null');
        this.formUserProAmount.get('Ctrl_1').setValue(0);
      }
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
      const paymentPerHour = this.formUserProAmount.value.Ctrl_1;
      const category =
        userType === 'gen' ? 'null' : this.formUserProCat.value.Ctrl_1;

      const data: UserData = {
        firstName,
        lastName,
        address,
        email,
        password,
        picURL,
        userType,
        paymentPerHour,
        category
      };
      console.log(data);
      this.userService.updateUser(data);
    } else {
      alert('submission fail');
    }
  }
}
