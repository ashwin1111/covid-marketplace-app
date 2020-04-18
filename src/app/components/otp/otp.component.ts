import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../modal/alert.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  phno: any;
  otp: any;
  phnoAvailable: any;


  openDialog(values): void {
    var data = {
      text: values.text,
      button: values.button,
      heading: values.heading,
      bigHeading: values.bigHeading
    };

    const dialogRef = this.dialog.open(Alert, {
      width: '400px',
      height: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      if (data.text === 'Verification successful') {
        this.router.navigate(['/login']);
      } else if (data.text === 'OTP expired') {
        this.router.navigate(['/resend-otp']);
      }
    });
  }


  submitOtp() {
    var data = {
      phno: this.phno,
      otp: this.otp
    };

    var baseUrl = this.apiService.getBaseUrl();
    this.spinner.show();

    this.apiService.apiCall(baseUrl + '/auth/verify', data).then(res => {
      this.otp = null;
      if (Object(res).msg === 'User verified') {
        var data = {
          text: 'Verification successful',
          button: 'Close',
          heading: '',
          bigHeading: 'Account Verified'
        }
        this.openDialog(data);
      } else if (Object(res).error.msg === 'OTP expired') {
        var data = {
          text: 'OTP expired',
          button: 'Close',
          heading: '',
          bigHeading: 'Account Verification failed'
        }
        this.openDialog(data);
      } else if (Object(res).error.msg === 'Invalid OTP') {
        var data = {
          text: 'Invalid OTP',
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Account Verification failed :('
        }
        this.openDialog(data);
      } else {
        var data = {
          text: `Problem with OTP`,
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Account Verification failed :('
        }
        this.openDialog(data);
      }
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.phnoAvailable = localStorage.getItem('otp_phn')
    this.phno = this.phnoAvailable;
  }

}
