import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-display-booking',
  templateUrl: './display-booking.component.html',
  styleUrls: ['./display-booking.component.css']
})
export class DisplayBookingComponent implements OnInit {

  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[0];
  constructor(
    private router: Router
  ) {
    this.queryParams = this.router.getCurrentNavigation().extras.queryParams;
  }

  queryParams: any;

  ngOnInit(): void {
  }

}
