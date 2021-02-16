import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //creare a user java script object with properties
  user = {username: '', password: '', remember: false};
  constructor(public dialogRef: MatDialogRef<LoginComponent>)
  //inject Matdialog ref  that will take the corresponding component.

  { }

  ngOnInit() {
  }
  
  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();
  }

  

}
