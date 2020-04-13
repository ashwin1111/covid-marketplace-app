import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

export interface DialogData {
    text: string;
    button: string;
    heading: string;
    bigHeading: string;
}

@Component({
    selector: 'alert',
    templateUrl: 'alert.html'
})
export class Alert implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<Alert>,
        public dialog: MatDialog,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    text: any;
    button: any;
    heading: any;
    bigHeading: any;

    onNoClick(): void {
        // console.log('texttext', this.data)
        if (this.data.text === 'Thanks for verifying your phone number') {
            this.router.navigate(['/login']);
        } else if (this.data.text === 'Sorry to inform you that your OTP has expired, you can generate a new otp by clicking Re-send otp below') {
            this.router.navigate(['/resend-otp']);
        }
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}