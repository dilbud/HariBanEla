import { ServerData } from 'app/data/models/serverData';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RowData {
  no: string;
  name: string;
  cat: string;
  rate: string;
  row: any;
}
export interface Field {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-professional-list-table',
  templateUrl: './professional-list-table.component.html',
  styleUrls: ['./professional-list-table.component.scss']
})
export class ProfessionalListTableComponent implements OnInit, OnChanges {

  @Input() filteredList: ServerData[];
  @Input() fields: Field[];

  allUserTable: any[] = [];

  displayedColumns: string[] = ['no', 'name', 'cat', 'rate', 'id'];
  dataSource: MatTableDataSource<RowData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.filteredList.forEach((val, index) => {
      let singleUser: RowData = {
        no: (index + 1).toString(),
        name: val.firstName + ' ' + val.lastName,
        cat: this.fields.filter((item: Field) => (item.value === val.category)).map((item: Field) => item.viewValue)[0],
        rate: val.rate.toString(),
        row: val
      };
      this.allUserTable.push(singleUser);
    });
    this.dataSource = new MatTableDataSource(this.allUserTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.filteredList.currentValue);
    console.log(changes.fields.currentValue);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(item: any) {
    this.router.navigate(['../booking'], { queryParams: { id: item._id, type: item.userType } });
  }

}





