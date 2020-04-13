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
    const dialogRef = this.dialog.open(Alert, {
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
      // console.log('The dialog was closed');
    });
  }


  submitOtp() {
    var data = {
      phno: this.phno,
      otp: this.otp
    };

    var baseUrl = this.apiService.getBaseUrl();

    this.apiService.apiCall(baseUrl + '/auth/verify', data).then(res => {
      if (Object(res).auth === true && Object(res).msg === 'User verified') {
        var data = {
          text: 'Thanks for verifying your phone number',
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Account Verified'
        }
        this.openDialog(data);
      } else if (Object(res).error.msg === 'OTP expired') {
        var data = {
          text: 'Sorry to inform you that your OTP has expired, you can generate a new otp by clicking Re-send otp below',
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Account Verification failed :('
        }
        this.openDialog(data);
      } else if (Object(res).error.msg === 'Invalid OTP') {
        var data = {
          text: 'Invalid OTP, please try with the right OTP',
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Account Verification failed :('
        }
        this.openDialog(data);
      } else {
        var data = {
          text: `There was a problem with the OTP verification, our team is notified they'll assist you`,
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
