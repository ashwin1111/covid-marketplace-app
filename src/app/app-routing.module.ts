import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifiedComponent } from './components/verified/verified.component';
import { BookMarketplaceComponent } from './components/book-marketplace/book-marketplace.component';
import { ScannerComponent } from './components/scanner/scanner.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'book-marketplace' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'book-marketplace', component: BookMarketplaceComponent },
  { path: 'QRscanner', component: ScannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }