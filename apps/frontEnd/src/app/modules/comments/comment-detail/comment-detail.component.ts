import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'app/data/models/comment';
import { CommentService } from 'app/data/services/comment.service';
import { UserService } from 'app/data/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {

  @Input() comment;
  owner;

  constructor(private commentService: CommentService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner() {
    this.userService.getUserDataById(this.comment.userId).subscribe(res => {
      this.owner = res.serverData;
      // console.log(this.owner);
    }, err => {
      console.log(err);
    });
  }

  viewProfile() {
    this.router.navigate(['../../view'], { queryParams: { id: this.owner.id, type: this.owner.userType } });
  }

}
