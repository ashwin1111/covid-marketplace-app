import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../modal/alert.component';

@Component({
  selector: 'app-resend-otp',
  templateUrl: './resend-otp.component.html',
  styleUrls: ['./resend-otp.component.css']
})
export class ResendOtpComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  phno: any;
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
      phno: this.phno
    };

    var baseUrl = this.apiService.getBaseUrl();

    this.apiService.apiCall(baseUrl + '/auth/resend_otp', data).then(res => {
      if (Object(res).msg === 'OTP sent successfully') {
        this.router.navigate(['/otp']);
      } else if (Object(res).msg === 'Limit exceeded') {
        var data = {
          text: 'Limit exceeded for sending OTP',
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Sending OTP failed :('
        }
        this.openDialog(data);
      } else {
        var data = {
          text: `There was a problem with the OTP verification, our team is notified they'll assist you`,
          button: 'Close',
          heading: 'Reason',
          bigHeading: 'Sending OTP failed :('
        }
        this.openDialog(data);
      }
    });
  }
 
  ngOnInit(): void {
    this.phnoAvailable = localStorage.getItem('otp_phn')
    this.phno = this.phnoAvailable;
  }

}
