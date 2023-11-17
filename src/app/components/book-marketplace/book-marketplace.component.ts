import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
    this.dateslotUpdate.pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(value => {
        this.marketPlaces = [];
        var date = new Date(value);
        var month = date.getMonth()+1;
        var monthString;
        if (month < 10) {
          monthString = '0' + month.toString();
        } else {
          monthString = month.toString();
        }
        this.dateString = date.getFullYear().toString() + '-' + monthString + '-' + date.getDate().toString();
        this.spinner.show();
        this.apiService.getApiCall(this.apiService.getBaseUrl() + '/user/MarketPlaces?on_date='+this.dateString).then(res => {
          if (Object(res).msg === 'No Market-Place details found with the active status for that date') {
            var data = {
              heading: 'No active markets on selected date',
              button: 'Close',
              text: 'Try selecting some other date',
              bigHeading: 'Shop unavailable'
            }
            this.openDialog(data);
          } else {
            this.marketPlacesCollection = Object(res).marketPlaces;
            Object(res).marketPlaces.forEach(element => {
              if (element.json_agg !== null) {
                this.marketPlaces.push({
                  value: element.market_place_id,
                  viewValue: element.market_palce_name
                });
              }
            });
          }
          this.spinner.hide();
        }).catch(err => {
          this.spinner.hide();
        });
      });

      this.timeslotUpdate.pipe(
        debounceTime(100),
        distinctUntilChanged())
        .subscribe(value => {
          this.timeslotCollection = [];
          this.address = null;
          var obj = this.marketPlacesCollection.filter(f => f.market_place_id === value);
          this.address = obj[0].market_place_address;
          obj = obj[0].json_agg;
          obj.forEach(element => {
            this.timeslotCollection.push({
              timeSlotIds: element.id,
              timeSlotRanges: element.time_slot_range
            });
          });
        });
  }

  dateString: any;
  // year, month - 1, date, 0, 0
  invalidMoment =  new Date(2020, 3, 14, 0, 0);
  min = new Date(2020, 3, 14, 0, 0);
  max = new Date(2021, 3, 14, 0, 0);
  dateSelected: any;
  timeslotUpdate = new Subject<string>();
  dateslotUpdate = new Subject<string>();
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
  filename: any;
  code: any;
  displayQr = false;
  address: any;

  openDialog(values): void {
    var data = {
      text: values.text,
      button: values.button,
      heading: values.heading,
      bigHeading: values.bigHeading
    }
    const dialogRef = this.dialog.open(Alert, {
      width: '400px',
      height: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      if (data.text === 'Slot booked successfully') {
        this.router.navigate(['/display-booking'], {
          queryParams: {
            filename: this.filename,
            code: this.code
          }
        });
      }
    });
  }

  validateResult(res) {
    // TODO: handle all cases
    if (Object(res).msg === 'Slot booked successfully') {
      this.filename = Object(res).file;
      this.code = Object(res).code;
      this.displayQr = true;
    } else if (Object(res).msg === 'Sorry you Already booked this slot for today :)') {
      var data = {
        text: 'You have already booked this slot',
        button: 'Close',
        heading: '',
        bigHeading: 'Slot Booked already'
      }
      this.openDialog(data);
    } else if (Object(res).msg === 'Time slot has Full please choose any other time slot :)') {
      var data = {
        text: 'Choose some other time slot',
        button: 'Close',
        heading: '',
        bigHeading: 'No vacancy in selected time slot'
      }
      this.openDialog(data);
    } else {
      var data = {
        text: 'Problem occured while booking',
        button: 'Close',
        heading: '',
        bigHeading: 'Booking failed'
      }
      this.openDialog(data);
    }
  }

  createUrl() {
    let baseUrl = this.apiService.getBaseUrl();
    var time_slot = 'neasasd';
    time_slot = null;

    
    this.marketPlacesCollection.filter(f => {
      if (f.market_place_id === this.select) {
        f.json_agg.filter(f2 => {
          if (f2.id === this.select2) {
            time_slot = f2.time_slot_range;
          } else {
            // do nothing

          }
        })
      }
    });

    let data = {
      market_place_id: this.select,
      time_slot_id: this.select2,
      aadhar: this.aadhar,
      time_slot: time_slot,
      on_date: this.dateString,
      name: this.name
    };

    this.apiService.apiCall(baseUrl + '/user/book_slot', data).then(res => {
      this.spinner.hide();
      this.validateResult(res);
    });
  }

  submit(): void {
    this.spinner.show();
    // TODO: if all fields are filled
    if (true) {
      this.createUrl();
    } else {
      // please enter all required fields
      this.spinner.hide();
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.myapp.refreshAppComponent();
    if (this.isLoggedIn === false) {
      this.router.navigate(['/login']);
    } else {
      var user = JSON.parse(localStorage.getItem('user'));
      this.name = user.name;
      this.aadhar = user.aadhar;
      this.phno = user.phno;
    }
  }

}
