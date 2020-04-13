import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-display-booking',
  templateUrl: './display-booking.component.html',
  styleUrls: ['./display-booking.component.css']
})
export class DisplayBookingComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.queryParams =  this.router.getCurrentNavigation().extras.queryParams;
  }

  queryParams: any;

  ngOnInit(): void {
  }

}
