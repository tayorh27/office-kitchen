var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(spinner, router, cdRef) {
        this.spinner = spinner;
        this.router = router;
        this.cdRef = cdRef;
        this.elements = [];
        this.previous = [];
        this.headElements = ['ID', 'Plan', 'Amount Paid', 'Created Date', 'Preferences', 'Status'];
        this.fullname = localStorage.getItem('fullname');
        this.email = localStorage.getItem('email');
        this.number = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');
        this.delivery = localStorage.getItem('delivery');
        this.edit_profile = false;
        this.test = new Date();
        this.isError = false;
        this.isSuccess = false;
        this.errorMessage = '';
        this.successMessage = '';
        this.total_orders = 0;
        this.failed_orders = 0;
        this.completed_orders = 0;
        this.all_orders = [];
    }
    ProfileComponent.prototype.ngAfterViewInit = function () {
        this.callAfterViewInit();
    };
    ProfileComponent.prototype.callAfterViewInit = function () {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUserOrders();
        this.spinner.show();
        setTimeout(function () {
            _this.spinner.hide();
        }, 3000);
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.ordersRef.off();
    };
    ProfileComponent.prototype.profileEdit = function () {
        this.edit_profile = true;
    };
    ProfileComponent.prototype.getUserOrders = function () {
        var _this = this;
        this.ordersRef = firebase.database().ref("users/" + this.email.replace('.', ',') + "/orders");
        this.ordersRef.on('value', function (snapshot) {
            _this.all_orders = [];
            _this.elements = [];
            var index = 1;
            snapshot.forEach(function (values) {
                var item = values.val();
                _this.all_orders.push(item);
                var _extras = item['extras'];
                var prefs = '';
                if (item['plan'] == 'ECONOMY-WEEK' || item['plan'] == 'ECONOMY-MONTH') {
                    prefs = _extras['preference_one'] + "," + _extras['preference_two'];
                }
                if (item['plan'] == 'STANDARD-WEEK' || item['plan'] == 'STANDARD-MONTH') {
                    prefs = _extras['preference_one'] + "," + _extras['preference_two'] + "," + _extras['preference_three'] + "," + _extras['preference_four'];
                }
                _this.elements.push({ id: index.toString(), plan: item['plan'], amount: item['amount_paid'], date: item['created_date'], extras: prefs, status: item['status'] });
                index = index + 1;
            });
            _this.total_orders = _this.all_orders.length;
            var completed = _this.all_orders.filter(function (item, index, array) {
                return item['status'] == 'success';
            });
            var failed = _this.all_orders.filter(function (item, index, array) {
                return item['status'] == 'failed';
            });
            _this.completed_orders = completed.length;
            _this.failed_orders = failed.length;
            _this.mdbTable.setDataSource(_this.elements);
            _this.elements = _this.mdbTable.getDataSource();
            _this.previous = _this.mdbTable.getDataSource();
        });
    };
    ProfileComponent.prototype.saveProfile = function () {
        var _this = this;
        if (this.isFieldFilled()) {
            firebase.database().ref("users/" + this.email.replace('.', ',') + "/signup").update({
                'fullname': this.fullname,
                'number': "" + this.number,
                'address': this.address,
                'delivery': this.delivery
            }).then(function (prop) {
                localStorage.setItem('phone', _this.number);
                localStorage.setItem('fullname', _this.fullname);
                localStorage.setItem('address', _this.address);
                localStorage.setItem('delivery', _this.delivery);
                _this.edit_profile = false;
                _this.displaySuccess('Updated successfully');
            }).catch(function (err) {
                _this.displayError(err);
            });
        }
        else {
            this.displayError('Please all fields must be filled.');
        }
    };
    ProfileComponent.prototype.cancelEditProfile = function () {
        this.edit_profile = false;
        this.fullname = localStorage.getItem('fullname');
        this.email = localStorage.getItem('email');
        this.number = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');
        this.delivery = localStorage.getItem('delivery');
    };
    ProfileComponent.prototype.logout = function () {
        var _this = this;
        firebase.auth().signOut().then(function (prop) {
            _this.router.navigate(['/home']);
        });
    };
    ProfileComponent.prototype.isFieldFilled = function () {
        if (this.fullname == '' || this.email == '' || this.address == '' || this.number == '' || this.delivery == '') {
            return false;
        }
        else {
            return true;
        }
    };
    ProfileComponent.prototype.closeMessage = function () {
        this.isSuccess = false;
        this.isError = false;
        this.errorMessage = '';
        this.successMessage = '';
    };
    ProfileComponent.prototype.displaySuccess = function (message) {
        this.isError = false;
        this.isSuccess = true;
        this.successMessage = message;
    };
    ProfileComponent.prototype.displayError = function (message) {
        this.isSuccess = false;
        this.isError = true;
        this.errorMessage = message;
    };
    __decorate([
        ViewChild(MdbTablePaginationComponent),
        __metadata("design:type", MdbTablePaginationComponent)
    ], ProfileComponent.prototype, "mdbTablePagination", void 0);
    __decorate([
        ViewChild(MdbTableDirective),
        __metadata("design:type", MdbTableDirective)
    ], ProfileComponent.prototype, "mdbTable", void 0);
    ProfileComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, Router, ChangeDetectorRef])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map