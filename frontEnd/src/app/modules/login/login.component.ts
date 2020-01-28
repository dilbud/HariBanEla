import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDComponent } from './login-d/login-d.component';
import { UserService } from '../../data/services/user.service';
import { LogoutDComponent } from './logout-d/logout-d.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  mode = true;
  email: string;
  password: string;
  name: string;
  isAuthenticated = false;
  user = null;
  toggle = true; // disable login link

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.user = this.userService.getUserData();
        this.mode = !this.isAuthenticated;
      });
    this.mode = !this.isAuthenticated;
  }

  ngOnDestroy() {
    this.userService.getAuthStatusListener().unsubscribe();
  }

  nothing() {
    alert('state ' + this.toggle);
    return;
  }
  loginDialog(): void {
    this.toggle = false;
    const dialogRef = this.dialog.open(LoginDComponent, {
      width: '400px', height: '30em',
      data: { email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('login data ', result);
      if (result === 'google') {
        this.toggle = true;
        this.userService.google();
        return;
      }
      if (result === 'facebook') {
        this.toggle = true;
        this.userService.facebook();
        // setTimeout(() => {
        //   if (this.UserService.getIsAuth()) {
        //     this.mode = false;
        //   } else {
        //     this.loginDialog();
        //   }
        // }, 50000);
        return;
      }
      if (result === 'close') {
        this.toggle = true;
        return;
      }
      if (result !== null) {
        this.toggle = true;
        this.email = result.email;
        this.password = result.password;
        this.userService.login(this.email, this.password);
        return;
      }

    });
  }

  logoutDialog(): void {

    this.userService.logout();
    // const userName  = this.user.firstName + ' ' + this.user.lastName;
    // const dialogRef = this.dialog.open(LogoutDComponent, {
    //   width: '500px',
    //   data: { name: userName }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != null && result === 'yes') {
    //     this.UserService.logout();
    //     this.mode = !this.UserService.getIsAuth(); // MUST CALL RXJX
    //   }
    // });
  }
}
