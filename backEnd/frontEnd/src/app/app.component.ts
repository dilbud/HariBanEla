import { Component, OnInit } from '@angular/core';
import { UserService } from './data/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontEnd';
  val = 1;
  isNavbarCollapsed = true;
  constructor(private authService: UserService) {}

  OnInit() {
    this.authService.autoAuthUser();
  }
}
