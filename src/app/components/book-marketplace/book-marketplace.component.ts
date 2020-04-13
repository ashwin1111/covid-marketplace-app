import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { NgxSpinnerService } from "ngx-spinner";
import { Alert } from '../modal/alert.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-book-marketplace',
  templateUrl: './book-marketplace.component.html',
  styleUrls: ['./book-marketplace.component.css']
})
export class BookMarketplaceComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    public myapp: AppComponent,
    private spinner: NgxSpinnerService
  ) {
    this.timeslotUpdate.pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(value => {
        var obj = this.marketPlacesCollection.filter(f => f.market_place_id === value);
        obj = obj[0].time_slot_data;
        obj.forEach(element => {
          this.timeslotCollection.push({
            timeSlotIds: element.id,
            timeSlotRanges: element.time_slot_range
          });
        });
      });
  }

  timeslotUpdate = new Subject<string>();
  marketPlaces = [];
  timeslotCollection = [];
  select: any;
  data: any;
  isLoggedIn = false;
  aadhar: any;
  phno: any;
  name: any;
  timeslot = [];
  startTime: any;
  endTime: any;
  marketPlacesCollection: any;
  select2: any;

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
    });
  }

  validateResult(res) {
    // TODO: handle all cases
    if (Object(res).msg === 'Slot booked successfully') {
      var data = {
        text: 'Slot booked successfully',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Slot booked!'
      }
      this.openDialog(data);
    } else if (Object(res).msg === 'Sorry you Already booked this slot for today :)') {
      var data = {
        text: 'Sorry you Already booked this slot for today',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Booking failed :('
      }
      this.openDialog(data);
    } else if (Object(res).error && Object(res).error.msg === 'Not a valid URL') {
      var data = {
        text: 'Please enter a valid URL',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Creating Short Url failed :('
      }
      this.openDialog(data);
    } else {
      var data = {
        text: 'Problem while booking your slot',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Booking failed :('
      }
      this.openDialog(data);
    }
  }

  createUrl() {
    var baseUrl = this.apiService.getBaseUrl();
    let data = {
      market_place_id: this.select,
      time_slot_id: this.select2
    };

    this.apiService.apiCall(baseUrl + '/user/book_slot', data).then(res => {
      this.spinner.hide();
      this.validateResult(res);
    });
  }

  submit(): void {
    this.spinner.show();
    // TODO: if all fields are filled
    if (1) {
      this.createUrl();
    } else {
      // please enter all required fields
      this.spinner.hide();
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.isLoggedIn = this.myapp.refreshAppComponent();
    if (this.isLoggedIn === false) {
      this.router.navigate(['/login']);
    } else {
      this.apiService.getApiCall(this.apiService.getBaseUrl() + '/user/MarketPlaces').then(res => {
        this.marketPlacesCollection = Object(res).marketPlaces;
        Object(res).marketPlaces.forEach(element => {
          this.marketPlaces.push({
            value: element.market_place_id,
            viewValue: element.market_palce_name
          });
        });
        this.spinner.hide();
      }).catch(err => {
        // console.log(err);
        this.spinner.hide();
      });

      var user = JSON.parse(localStorage.getItem('user'));
      this.name = user.name;
      this.aadhar = user.aadhar;
      this.phno = user.phno;
    }
  }

}
