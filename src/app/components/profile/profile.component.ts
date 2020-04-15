import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public myapp: AppComponent,
    private router: Router
  ) { }

  name: any;
  aadhar: any;
  phno: any;
  email: any;

  ngOnInit(): void {
    var isLoggedIn = this.myapp.refreshAppComponent();
    if (isLoggedIn === false) {
      this.router.navigate(['/login']);
    } else {
      var user = JSON.parse(localStorage.getItem('user'));
      this.name = user.name;
      this.aadhar = user.aadhar;
      this.phno = user.phno;
      this.email = user.email;
    }
  }

}
