import { Component, OnInit } from '@angular/core';
import { UserService } from './data/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    // this.authService.autoAuthUser();
  }


}
