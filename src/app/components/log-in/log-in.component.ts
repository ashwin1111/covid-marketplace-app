import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../modal/alert.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
  email: any;
  password: any;

  openDialog(values): void {
    const dialogRef = this.dialog.open(Alert, {
      panelClass: 'my-dialog',
      width: '400px',
      height: '400px',
      data: {
        text: values.text,
        button: values.button,
        heading: values.heading,
        bigHeading: values.bigHeading
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  login(): void {
    this.spinner.show();
    if ((this.email !== '' && this.email !== undefined) && (this.password !== '' && this.password !== undefined)) {
      var data = {
        email: this.email,
        password: this.password
      };

      var baseUrl = this.apiService.getBaseUrl();

      this.apiService.apiCall(baseUrl + '/auth/login', data).then(res => {
        if (Object(res).auth === true && Object(res).msg === 'Login success :)') {
          localStorage.setItem('x-access-token', Object(res).token);
          localStorage.setItem('user', JSON.stringify(Object(res).data));
          this.router.navigate(['/book-marketplace']);
        } else if (Object(res).error.msg === 'Account not verified') {
          var data = {
            text: 'OTP verification pending',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed'
          }
          this.openDialog(data);
        } else if (Object(res).error.msg === 'No user found with the given creds') {
          var data = {
            text: 'User not found',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed'
          }
          this.openDialog(data);
        } else if (Object(res).error.msg === 'Invalid creds') {
          var data = {
            text: 'Invalid credentials',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed'
          }
          this.openDialog(data);
        } else {
          var data = {
            text: 'Problem while logging',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed'
          }
          this.openDialog(data);
        }
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      // please enter all required fields
    }
  }

  ngOnInit() {
    this.spinner.show();

    if (localStorage.getItem('x-access-token') !== null) {
      this.router.navigate(['/book-marketplace']);
    }
    this.spinner.hide();
  }

}
