var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(spinner, router) {
        this.spinner = spinner;
        this.router = router;
        this.email = '';
        this.password = '';
        this.isError = false;
        this.isSuccess = false;
        this.errorMessage = '';
        this.successMessage = '';
        this.loadingText = 'Please wait...';
        this.spinnerConfig = {
            bdOpacity: 0.3,
            bdColor: '#333',
            size: 'medium',
            color: '#000',
            type: 'ball-8bits',
            fullScreen: true
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('logged') == 'true') {
            this.router.navigate(['/home']);
        }
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (this.isFieldFilled()) {
            this.closeMessage();
            if (firebase.auth().currentUser) {
                this.retrieveDataFromBase(firebase.auth().currentUser);
                return;
            }
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (data) {
                _this.retrieveDataFromBase(data.user);
            }).catch(function (err) {
                _this.displayError(err);
            });
        }
        else {
            this.displayError('Please all fields must be filled.');
        }
    };
    LoginComponent.prototype.retrieveDataFromBase = function (user) {
        var _this = this;
        var email = user.email.replace('.', ',');
        firebase.database().ref("users/" + email + "/signup").once('value', function (snapshot) {
            var values = snapshot.val();
            localStorage.setItem('email', values['email']);
            localStorage.setItem('phone', values['number']);
            localStorage.setItem('fullname', values['fullname']);
            localStorage.setItem('address', values['address']);
            localStorage.setItem('delivery', values['delivery']);
        }).then(function (prop) {
            _this.router.navigate(['/home']);
        }).catch(function (err) {
            _this.displayError(err);
        });
    };
    LoginComponent.prototype.forgotpassword = function () {
        var _this = this;
        if (this.email == '') {
            this.displayError('Please enter your email address');
            return;
        }
        firebase.auth().sendPasswordResetEmail(this.email).then(function (prop) {
            _this.displaySuccess('Password reset instruction has been sent to your email.');
        }).catch(function (err) {
            _this.displayError(err);
        });
    };
    LoginComponent.prototype.isFieldFilled = function () {
        if (this.email == '' || this.password == '') {
            return false;
        }
        else {
            return true;
        }
    };
    LoginComponent.prototype.closeMessage = function () {
        this.isSuccess = false;
        this.isError = false;
        this.errorMessage = '';
        this.successMessage = '';
    };
    LoginComponent.prototype.displaySuccess = function (message) {
        this.isError = false;
        this.isSuccess = true;
        this.successMessage = message;
    };
    LoginComponent.prototype.displayError = function (message) {
        this.isSuccess = false;
        this.isError = true;
        this.errorMessage = message;
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map