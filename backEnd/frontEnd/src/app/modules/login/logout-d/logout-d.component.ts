import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-logout-d',
  templateUrl: './logout-d.component.html',
  styleUrls: ['./logout-d.component.scss']
})
export class LogoutDComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }
}
