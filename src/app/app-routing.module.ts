import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifiedComponent } from './components/verified/verified.component';
import { BookMarketplaceComponent } from './components/book-marketplace/book-marketplace.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { OtpComponent } from './components/otp/otp.component';
import { OtpComponent2 } from './components/otp2/otp2.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'book-marketplace' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'book-marketplace', component: BookMarketplaceComponent },
  { path: 'QRscanner', component: ScannerComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'resend-otp', component: ResendOtpComponent },
  { path: 'qr-scan', component: OtpComponent2 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }