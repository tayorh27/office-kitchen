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
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { EmailBody } from '../email-body';
var LandingComponent = /** @class */ (function () {
    function LandingComponent(config, http) {
        this.http = http;
        this.name = '';
        this.email = '';
        this.number = '';
        this.message = '';
        this.showSpinner = true;
        this.isError = false;
        this.isSuccess = false;
        this.errorMessage = '';
        this.successMessage = '';
        this.emailBody = new EmailBody();
        config.interval = 3000;
        config.wrap = true;
        config.keyboard = true;
        config.pauseOnHover = false;
    }
    //   loadingConfig: INg2LoadingSpinnerConfig = {
    //     backdropColor  : 'rgba(0, 0, 0, 0.3)',
    //     animationType  : ANIMATION_TYPES.bouncingDots,
    //     spinnerPosition: 'left',
    //     backdropBorderRadius: '10px',
    //     spinnerSize: 'xs',
    //     spinnerFontSize: '2rem',
    //     spinnerColor   : '#fff',
    // };
    LandingComponent.prototype.ngOnInit = function () {
    };
    LandingComponent.prototype.clearFields = function () {
        this.name = '';
        this.email = '';
        this.number = '';
        this.message = '';
    };
    LandingComponent.prototype.sendMessage = function () {
        var _this = this;
        this.closeMessage();
        if (!this.isFieldFilled()) {
            this.displayError('All fields must be filled.');
            return;
        }
        setTimeout(function () {
            _this.showSpinner = false;
        }, 5000);
        var subject = 'Contact us message';
        var em_body = "\n    Below are the information of the user--\n    FULL NAME: " + this.name + "--\n    EMAIL ADDRESS: " + this.email + "--\n    PHONE NUMBER: " + this.number + "--\n    MESSAGE: " + this.message + "--\n    ";
        //const sendBody = this.emailBody.Body(em_body, subject);
        var url = "https://mail.officekitchen.ng/send.php?subject=" + subject + "&body=" + em_body + "&reply=" + this.email;
        this.http.get(url).toPromise().finally(function () {
            _this.clearFields();
            _this.displaySuccess('Message sent successfully.');
        });
    };
    LandingComponent.prototype.isFieldFilled = function () {
        if (this.email == '' || this.number == '' || this.message == '' || this.name == '') {
            return false;
        }
        else {
            return true;
        }
    };
    LandingComponent.prototype.closeMessage = function () {
        this.isSuccess = false;
        this.isError = false;
        this.errorMessage = '';
        this.successMessage = '';
    };
    LandingComponent.prototype.displaySuccess = function (message) {
        this.isError = false;
        this.isSuccess = true;
        this.successMessage = message;
    };
    LandingComponent.prototype.displayError = function (message) {
        this.isSuccess = false;
        this.isError = true;
        this.errorMessage = message;
    };
    LandingComponent = __decorate([
        Component({
            selector: 'app-landing',
            templateUrl: './landing.component.html',
            styleUrls: ['./landing.component.scss']
        }),
        __metadata("design:paramtypes", [NgbCarouselConfig, HttpClient])
    ], LandingComponent);
    return LandingComponent;
}());
export { LandingComponent };
//# sourceMappingURL=landing.component.js.map