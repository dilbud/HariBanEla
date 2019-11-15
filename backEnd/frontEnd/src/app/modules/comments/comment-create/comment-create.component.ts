import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'app/data/models/comment';
import { CommentService } from 'app/data/services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  commentModel = new Comment;
  @Input() questionId;
  @Input() answerId;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  onComment(status) {
    if (status = 0) {
      this.commentService.addComment(this.commentModel, this.questionId)
        .subscribe(
          data => {
            console.log("Success", data);
            // 
          },
          error => console.log("Error", error)
        );
    }else{
      this.commentService.addComment(this.commentModel, this.questionId, this.answerId)
        .subscribe(
          data => {
            console.log("Success", data);
            // 
          },
          error => console.log("Error", error)
        );
    }
  }
}