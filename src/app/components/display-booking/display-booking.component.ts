import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-display-booking',
  templateUrl: './display-booking.component.html',
  styleUrls: ['./display-booking.component.css']
})
export class DisplayBookingComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public myapp: AppComponent
  ) { }

  timeslot = [];
  card: any;

  redirect(id) {
    var obj = this.timeslot.filter(f => f.data.id === id);
    this.router.navigate(['/booking-details'], {
      queryParams: obj[0].data
    });
  }

  ngOnInit(): void {
    var isLoggedIn = this.myapp.refreshAppComponent();
    if (isLoggedIn === false) {
      this.router.navigate(['/login']);
    } else {
      this.spinner.show();
      this.apiService.getApiCall(this.apiService.getBaseUrl() + '/user/booking_history').then(res => {
        this.spinner.hide();
        Object(res).marketPlaces.forEach(element => {
          this.timeslot.push({
            data: {
              code: element.digit_code,
              name: element.market_data.name,
              address: element.market_data.address,
              time: element.time_slot_range,
              date: element.on_date,
              qr: element.file_name,
              id: element.booking_id,
              created_at: element.created_at
            }
          });
        });
      }).catch(err => {
        this.spinner.hide();
      });
    }
  }

}
