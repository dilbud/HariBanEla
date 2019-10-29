import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-d',
  templateUrl: './login-d.component.html',
  styleUrls: ['./login-d.component.scss']
})
export class LoginDComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<LoginDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }


}
