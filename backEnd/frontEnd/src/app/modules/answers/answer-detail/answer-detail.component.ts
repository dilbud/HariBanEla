import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'app/data/models/answer';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'app/data/services/answer.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  @Input() questionId:string;
  @Input() answer:Answer;
  isCommentCollapsed = true;

  constructor(private answerService: AnswerService, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  voteAnswer(status){
    let id = this.route.snapshot.params.id;
    this.answerService.voteAnswer(this.questionId,this.answer._id,status).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  
}
