import { ServerData } from 'app/data/models/serverData';
import { Router } from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-professional-list-table',
  templateUrl: './professional-list-table.component.html',
  styleUrls: ['./professional-list-table.component.scss']
})
export class ProfessionalListTableComponent implements OnInit {

  @Input() filteredList: ServerData[];

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  view(item: any) {
    this.router.navigate(['../booking'], { queryParams: { id: item._id, type: item.userType } });
  }

}
