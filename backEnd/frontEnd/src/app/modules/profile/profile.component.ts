import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/data/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   user = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUserData();
    this.userService.getAuthStatusListener()
    .subscribe( (isAuth: boolean) => {
      this.user = this.userService.getUserData();
    });
  }

}
