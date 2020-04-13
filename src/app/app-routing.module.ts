import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifiedComponent } from './components/verified/verified.component';
import { BookMarketplaceComponent } from './components/book-marketplace/book-marketplace.component';
import { OtpComponent } from './components/otp/otp.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { DisplayBookingComponent } from './components/display-booking/display-booking.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'book-marketplace' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'book-marketplace', component: BookMarketplaceComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'resend-otp', component: ResendOtpComponent },
  { path: 'display-booking', component: DisplayBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }