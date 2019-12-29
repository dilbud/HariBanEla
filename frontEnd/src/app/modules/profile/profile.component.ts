import { Component, OnInit} from "@angular/core";
import { UserService } from "app/data/services/user.service";
import { ActivatedRoute, Params } from "@angular/router";
import { filter } from "rxjs/operators";
import { AlertService } from "app/data/services/alert.service";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user = null;
  id = null;

  mode = false;
  type: any;

  constructor(
    private userService: UserService,

    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.id = queryParams.id;
      this.type = queryParams.type;
      this.getUser();
      // if (this.id === null || this.id === undefined) {
      //   this.mode = true;
      // }
    });
  }

  private getUser() {
    if (this.type === 'current') {
      this.user = this.userService.getUserData();
      this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
        this.user = this.userService.getUserData();
      });
    } else if( this.type === 'pro') {
      console.log('get pro user ==================');
      let res;
      this.userService.getProProfile(this.id).subscribe(
        response => {
          res = response;
        },
        error => {
          this.alertService.setAlert("Something wrong !");
          this.alertService.setAlert(error.error.msg);
          this.alertService.showAlert();
        },
        () => {
          this.user = res.serverData;
        }
      );
    } else {

    }
  }

}
