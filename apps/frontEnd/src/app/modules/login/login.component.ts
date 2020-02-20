import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDComponent } from './login-d/login-d.component';
import { UserService } from '../../data/services/user.service';

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
  /**
   * @param  {MatDialog} privatedialog
   * @param  {UserService} privateuserService
   */
  constructor(private dialog: MatDialog, private userService: UserService) {}

  /**
   */
  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuth();
    this.user = this.userService.getUserData();
    this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.user = this.userService.getUserData();
        this.mode = !this.isAuthenticated;
      });
    this.mode = !this.isAuthenticated;
  }
  /**
   * when destroy component
   * RxJs unsubscribe auth listener
   */
  ngOnDestroy() {
    this.userService.getAuthStatusListener().unsubscribe();
  }
  /**
   *
   */
  // nothing() {
  //   alert('state ' + this.toggle);
  //   return;
  // }
  /**
   * open popup dialog
   * and
   * handle close data
   */
  loginDialog(): void {
    this.toggle = false;
    const dialogRef = this.dialog.open(LoginDComponent, {
      width: '400px',
      height: '30em',
      data: { email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'google') {
        this.toggle = true;
        this.userService.google();
        return;
      }
      if (result === 'facebook') {
        this.toggle = true;
        this.userService.facebook();
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
  /**
   * call user service
   * logout user
   */
  logoutDialog(): void {
    this.mode = true;
    this.userService.logout();
  }
}
