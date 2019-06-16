var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './app-route-guard';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuComponent } from './menu/menu.component';
import { MatCardModule, MatSelectModule, MatSnackBarModule } from "@angular/material";
import { Angular4PaystackModule } from 'angular4-paystack';
import { HttpClientModule } from "@angular/common/http";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                SignupComponent,
                LandingComponent,
                ProfileComponent,
                NavbarComponent,
                FooterComponent,
                LoginComponent,
                MenuComponent
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
                HttpClientModule
            ],
            providers: [RouteGuard],
            bootstrap: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map