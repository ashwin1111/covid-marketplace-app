import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    public myapp: AppComponent
  ) {
    this.data = this.router.getCurrentNavigation().extras.queryParams;
  }

  data: any;

  ngOnInit(): void {
    var isLoggedIn = this.myapp.refreshAppComponent();
    if (isLoggedIn === false) {
      this.router.navigate(['/login']);
    }
  }

}
