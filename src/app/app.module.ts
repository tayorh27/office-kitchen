import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { RouteGuard, RouteOrderGuard } from './app-route-guard';

// import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuComponent } from './menu/menu.component';

import { MatCardModule, MatSelectModule, MatSnackBarModule } from "@angular/material";
import { Angular4PaystackModule } from 'angular4-paystack';
import { HttpClientModule } from "@angular/common/http";

import { AppOverlayModule } from './overlay/overlay.module';
import { ProgressSpinnerModule,ProgressSpinnerComponent } from './progress-spinner/progress-spinner.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserSignupsComponent } from './user-signups/user-signups.component';
// import { Ng2LoadingSpinnerModule, ANIMATION_TYPES } from 'ng2-loading-spinner'
// import { PlusSpinnerModule } from "plus-spinner";
// "ng2-loading-spinner": "^1.3.0",
//     ,
//     "ngx-spinner": "^7.1.4",
//     "plus-spinner": "^1.0.3",

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    MenuComponent,
    UserOrdersComponent,
    UserSignupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    // Ng2LoadingSpinnerModule.forRoot({}),
    //PlusSpinnerModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    // NgxSpinnerModule,
    MatCardModule,
    MatSelectModule,
    Angular4PaystackModule,
    MatSnackBarModule,
    HttpClientModule,
    AppOverlayModule,
    ProgressSpinnerModule
  ],
  entryComponents: [ProgressSpinnerComponent],
  providers: [RouteGuard, RouteOrderGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
