import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../modal/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
  name: any;
  email: any;
  password: any;
  password2: any;
  phnno: any;
  aadhar: any;

  openDialog(values): void {
    const dialogRef = this.dialog.open(Alert, {
      width: '70%',
      height: '50%',
      data: {
        text: values.text,
        button: values.button,
        heading: values.heading,
        bigHeading: values.bigHeading
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

  signup() {
    this.spinner.show();
    // Add check for pwd and re type pwd
    if ((this.name !== '' && this.name !== undefined) && (this.email !== '' && this.email !== undefined) && (this.password !== '' && this.password !== undefined)) {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
        aadhar: this.aadhar,
        phno: this.phnno
      };

      var baseUrl = this.apiService.getBaseUrl();

      this.apiService.apiCall(baseUrl + '/auth/register', data).then(res => {
        localStorage.set('otp_phn', this.phnno);
        this.name = null;
        this.email = null;
        this.password = null;
        this.password2 = null;
        this.aadhar = null;
        this.phnno = null;
        if (Object(res).msg === 'User registered successfully') {
<<<<<<< HEAD
          var data = {
            text: 'Kindly verify your email ID',
            button: 'Close',
            heading: 'TODO',
            bigHeading: 'Registered successfully :)'
          }
          this.openDialog(data);
          this.router.navigate(['/login']);
=======
          // var data = {
          //   text: 'Check your email to verify your account',
          //   button: 'Close',
          //   heading: 'TODO',
          //   bigHeading: 'Registered successfully :)'
          // }
          // this.openDialog(data);
          this.router.navigate(['/otp']);
>>>>>>> master
        } else if (Object(res).msg === 'Email already exists') {
          var data = {
            text: 'Email already exists',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
        } else if (Object(res).error && Object(res).error.msg === 'Email badly formatted') {
          var data = {
            text: 'Email badly formatted',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
        } else {
          var data = {
            text: 'Problem while registering',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
        }

        this.spinner.hide();
      });
    } else {
      // please enter all required fields
      this.spinner.hide();
    }
  }

  ngOnInit() {
  }

}