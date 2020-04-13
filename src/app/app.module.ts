import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { VerifiedComponent } from './components/verified/verified.component';
import { Alert } from './components/modal/alert.component';
import { BookMarketplaceComponent } from './components/book-marketplace/book-marketplace.component';
import { OtpComponent } from './components/otp/otp.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { DisplayBookingComponent } from './components/display-booking/display-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    Alert,
    VerifiedComponent,
    BookMarketplaceComponent,
    OtpComponent,
    ResendOtpComponent,
    DisplayBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [NgxSpinnerModule, NgxSpinnerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    Alert
  ]
})

export class AppModule { }