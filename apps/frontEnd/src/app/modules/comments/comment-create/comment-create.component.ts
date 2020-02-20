import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'app/data/models/comment';
import { CommentService } from 'app/data/services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  commentModel = new Comment();
  @Input() questionId;
  @Input() answerId;
  @Input() user;
  @Output() refreshEvent = new EventEmitter();

  constructor(private commentService: CommentService, private router: Router) {}

  ngOnInit() {
    this.commentModel.userId = this.user.id;
  }

  onComment(status) {
    if (status === 0) {
      console.log(this.commentModel);
      this.commentService
        .addComment(this.commentModel, this.questionId)
        .subscribe(
          data => {
            console.log('Success', data);
            this.refreshEvent.emit();
            // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
            //   this.router.navigate([`/questions/${this.questionId}`]));
          },
          error => console.log('Error', error)
        );
    } else {
      console.log(this.questionId + ' ' + this.answerId);
      this.commentService
        .addComment(this.commentModel, this.questionId, this.answerId)
        .subscribe(
          data => {
            console.log('Success', data);
            this.refreshEvent.emit();
            // this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
            //   this.router.navigate([`/questions/${this.questionId}`]));
          },
          error => console.log('Error', error)
        );
    }
  }
}
