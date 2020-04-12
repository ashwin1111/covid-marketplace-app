import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ShortUrlComponent } from './components/short-url/short-url.component';
import { VerifiedComponent } from './components/verified/verified.component';
import { ScannerComponent } from './components/scanner/scanner.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'short-url' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'short-url', component: ShortUrlComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'QRscanner', component: ScannerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }