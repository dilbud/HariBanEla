import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDComponent } from './login-d/login-d.component';
import { UserService } from '../../data/services/user.service';
import { LogoutDComponent } from './logout-d/logout-d.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mode = true;
  email: string;
  password: string;
  name: string;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private dialog: MatDialog, private UserService: UserService) {}

  loginDialog(): void {
    const dialogRef = this.dialog.open(LoginDComponent, {
      width: '500px',
      data: { email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'google') {
        this.UserService.google();
        setTimeout(() => {
          if (this.UserService.getIsAuth()) {
            this.mode = false;
          } else {
            this.loginDialog();
          }
        }, 50000);
        return;
      }
      if (result === 'facebook') {
        this.UserService.facebook();
        setTimeout(() => {
          if (this.UserService.getIsAuth()) {
            this.mode = false;
          } else {
            this.loginDialog();
          }
        }, 50000);
        return;
      }
      if (result != null) {
        this.email = result.email;
        this.password = result.password;
        this.UserService.login(this.email, this.password);
        setTimeout(() => {
          if (this.UserService.getIsAuth()) {
            this.mode = false;
          } else {
            this.loginDialog();
          }
        }, 500);
        return;
      }
    });
  }

  logoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDComponent, {
      width: '500px',
      data: { name: this.name = 'Dilan Buddika' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result === 'yes') {
        this.UserService.logout();
        this.mode = !this.UserService.getIsAuth(); // MUST CALL RXJX
      }
    });
  }
}
