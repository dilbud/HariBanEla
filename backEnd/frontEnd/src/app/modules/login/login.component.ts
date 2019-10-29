import { Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginDComponent } from './login-d/login-d.component';
import { UserService } from '../../data/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {



  mode = true;

  email: string;
  password: string;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(public dialog: MatDialog, public UserService: UserService) {}

  loginDialog(): void {
    const dialogRef = this.dialog.open(LoginDComponent, {
      width: '500px',
      data: {email: this.email, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      alert(result.email + result.password);
      this.email = result.email;
      this.password = result.password;
      this.mode = !this.mode;
      this.UserService.login(this.email, this.password);
    });
  }
  logoutDialog(): void {
    this.mode = !this.mode;
  }



}

