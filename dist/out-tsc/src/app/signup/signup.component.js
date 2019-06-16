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
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(spinner, router) {
        this.spinner = spinner;
        this.router = router;
        this.fullname = '';
        this.email = '';
        this.address = '';
        this.number = '';
        this.delivery = '';
        this.password = '';
        this.policy_accepted = false;
        this.isError = false;
        this.errorMessage = 'Hello';
        this.loadingText = 'Please wait...';
        this.test = new Date();
        this.spinnerConfig = {
            bdOpacity: 0.3,
            bdColor: 'rgba(53,52,52,0.7)',
            size: 'medium',
            color: '#5e72e4',
            type: 'ball-atom',
            fullScreen: true
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.spinner.show('', this.spinnerConfig);
        if (localStorage.getItem('logged') == 'true') {
            this.router.navigate(['/home']);
        }
    };
    SignupComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (this.isFieldFilled()) {
            if (!this.policy_accepted) {
                this.displayError('Please accept our policy.');
                return;
            }
            this.closeMessage();
            if (firebase.auth().currentUser) {
                this.uploadToDatabase(firebase.auth().currentUser);
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function (data) {
                _this.uploadToDatabase(data.user);
            }).catch(function (err) {
                _this.displayError(err);
            });
        }
        else {
            this.displayError('Please all fields must be filled.');
        }
    };
    SignupComponent.prototype.uploadToDatabase = function (user) {
        var _this = this;
        firebase.database().ref('users').child("" + this.email.replace('.', ',')).child('signup').set({
            'fullname': this.fullname,
            'email': this.email,
            'address': this.address,
            'number': "" + this.number,
            'delivery': this.delivery,
            'uid': user.uid,
            'created_date': new Date().toDateString() + "." + new Date().toTimeString()
        }).then(function (prop) {
            localStorage.setItem('email', _this.email);
            localStorage.setItem('phone', _this.number);
            localStorage.setItem('fullname', _this.fullname);
            localStorage.setItem('address', _this.address);
            localStorage.setItem('delivery', _this.delivery);
            _this.router.navigate(['/home']);
        }).catch(function (err) {
            _this.displayError(err);
        });
    };
    SignupComponent.prototype.isFieldFilled = function () {
        if (this.fullname == '' || this.email == '' || this.address == '' || this.number == '' || this.delivery == '' || this.password == '') {
            return false;
        }
        else {
            return true;
        }
    };
    SignupComponent.prototype.closeMessage = function () {
        this.isError = false;
        this.errorMessage = '';
    };
    SignupComponent.prototype.displayError = function (message) {
        this.isError = true;
        this.errorMessage = message;
    };
    SignupComponent = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, Router])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map