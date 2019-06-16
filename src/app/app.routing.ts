import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard, RouteOrderGuard } from './app-route-guard';
import { MenuComponent } from './menu/menu.component';
import { UserOrdersComponent } from "./user-orders/user-orders.component";
import { UserSignupsComponent } from "./user-signups/user-signups.component";

const routes: Routes =[
    { path: 'home',             component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent, canActivate: [RouteGuard] },
    { path: 'register',           component: SignupComponent},
    { path: 'landing',          component: HomeComponent},
    { path: 'login',          component: LoginComponent},
    { path: 'menu',          component: MenuComponent},
    { path: 'user-orders',          component: UserOrdersComponent, canActivate: [RouteOrderGuard]},
    { path: 'user-signups',          component: UserSignupsComponent, canActivate: [RouteOrderGuard]},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
