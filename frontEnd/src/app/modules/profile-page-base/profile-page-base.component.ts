import { Component, OnInit } from '@angular/core';
import { UserService } from "app/data/services/user.service";

@Component({
  selector: 'app-profile-page-base',
  templateUrl: './profile-page-base.component.html',
  styleUrls: ['./profile-page-base.component.scss']
})
export class ProfilePageBaseComponent implements OnInit {


  user = null;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
  }

}
