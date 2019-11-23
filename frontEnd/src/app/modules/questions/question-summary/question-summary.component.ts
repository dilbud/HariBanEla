import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'app/data/models/question';
import { UserService } from 'app/data/services/user.service';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.component.html',
  styleUrls: ['./question-summary.component.scss']
})
export class QuestionSummaryComponent implements OnInit {

  @Input() question:Question;
  owner;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log(this.question);
    this.getOwner();
  }

  getOwner(){
    this.userService.getUserDataById(this.question.userId).subscribe(res => {
      this.owner = res.serverData;
    }, err => {
      console.log(err);
    });
  }

  onQuestion(){
    this.router.navigate(['/questions',this.question._id]);
  }

}
