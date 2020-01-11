import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Router } from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  id = null;
  type: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.id = queryParams.id;
      this.type = queryParams.type;
    });
  }

}
