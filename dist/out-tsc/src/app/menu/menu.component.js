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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { EmailBody } from "../email-body";
var MenuComponent = /** @class */ (function () {
    // standard_foods_fifth_option: Food[] = [
    //   { value: 'Chicken', viewValue: 'Chicken' },
    //   { value: 'Turkey', viewValue: 'Turkey' },
    //   { value: 'Fish', viewValue: 'Fish' }
    // ];
    function MenuComponent(modalService, router, snackBar, http) {
        this.modalService = modalService;
        this.router = router;
        this.snackBar = snackBar;
        this.http = http;
        this.durationInSeconds = 5;
        this.email = localStorage.getItem('email');
        this.name = localStorage.getItem('fullname');
        this.phone = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');
        this.delivery = localStorage.getItem('delivery');
        this.amount_to_pay = '';
        this.public_key = ''; //'pk_test_fe5e7a92b2ac1e14defe1172eec62d743f974915';
        this.reference = "" + Math.random() * 10000000000000000;
        this.isLoggedIn = false;
        this.selected_plan = '';
        this.subscription_plan = '';
        this.economy_first = '';
        this.economy_second = '';
        this.standard_first = '';
        this.standard_second = '';
        this.standard_third = '';
        this.standard_forth = '';
        this.errorMessage = '';
        this.package_type = '';
        this.order_id = '';
        this.isSuccess = false;
        this.successMessage = '';
        //standard_fifth = '';
        this.emailBody = new EmailBody();
        this.economy_foods_first_option = [
            { value: 'Amala', viewValue: 'Amala' },
            { value: 'Eba', viewValue: 'Eba' },
            { value: 'Fufu', viewValue: 'Fufu' }
        ];
        this.economy_foods_second_option = [
            { value: 'Fried-Egg', viewValue: 'Fried Egg' },
            { value: 'Egg-Sauce', viewValue: 'Egg Sauce' }
        ];
        this.standard_foods_first_option = [
            { value: 'Jollof-Rice', viewValue: 'Jollof Rice' },
            { value: 'Fried-Rice', viewValue: 'Fried Rice' }
        ];
        this.standard_foods_second_option = [
            { value: 'Chicken', viewValue: 'Chicken' },
            { value: 'Turkey', viewValue: 'Turkey' },
            { value: 'Fish', viewValue: 'Fish' }
        ];
        this.standard_foods_third_option = [
            { value: 'White-Rice', viewValue: 'White Rice' },
            { value: 'Ofada-Rice', viewValue: 'Ofada Rice' }
        ];
        this.standard_foods_forth_option = [
            { value: 'Amala', viewValue: 'Amala' },
            { value: 'Eba', viewValue: 'Eba' },
            { value: 'Fufu', viewValue: 'Fufu' },
            { value: 'Semo', viewValue: 'Semo' },
            { value: 'Wheat', viewValue: 'Wheat' },
            { value: 'Pounded-yam', viewValue: 'Pounded yam' }
        ];
        this.getPublicKey();
    }
    MenuComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('logged') == 'true') {
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
        }
    };
    MenuComponent.prototype.buyNowClicked = function (package_type, content, errorContent, errorContent_Payment) {
        this.errorContent_Payment = errorContent_Payment;
        this.package_type = package_type;
        if (!this.isLoggedIn) {
            this.open(errorContent, '', '');
            return;
        }
        switch (package_type) {
            case 'economy-week':
                this.selected_plan = 'ECONOMY - ONE WEEK (₦3,000)';
                this.subscription_plan = 'economy';
                this.amount_to_pay = '300000';
                this.open(content, 'Notification', '');
                break;
            case 'economy-month':
                this.subscription_plan = 'economy';
                this.selected_plan = 'ECONOMY - ONE MONTH (₦11,000)';
                this.amount_to_pay = '1100000';
                this.open(content, 'Notification', '');
                break;
            case 'standard-week':
                this.subscription_plan = 'standard';
                this.selected_plan = 'STANDARD - ONE WEEK (₦5,000)';
                this.amount_to_pay = '500000';
                this.open(content, 'Notification', '');
                break;
            case 'standard-month':
                this.subscription_plan = 'standard';
                this.selected_plan = 'STANDARD - ONE MONTH (₦20,000)';
                this.amount_to_pay = '2000000';
                this.open(content, 'Notification', '');
                break;
        }
    };
    MenuComponent.prototype.open = function (content, type, modalDimension) {
        var _this = this;
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then(function (result) {
                _this.closeResult = 'Closed with: $result';
            }, function (reason) {
                _this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        }
        else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then(function (result) {
                _this.closeResult = 'Closed with: $result';
            }, function (reason) {
                _this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        }
        else {
            this.modalService.open(content, { centered: true }).result.then(function (result) {
                _this.closeResult = 'Closed with: $result';
            }, function (reason) {
                _this.closeResult = 'Dismissed $this.getDismissReason(reason)';
            });
        }
    };
    MenuComponent.prototype.getDismissReason = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return 'with: $reason';
        }
    };
    MenuComponent.prototype.sendToPayment = function () {
        console.log(this.economy_first);
    };
    MenuComponent.prototype.paymentDone = function (paystackData) {
        var _this = this;
        var status = paystackData['status'];
        var message = paystackData['message'];
        var trans = paystackData['trans'];
        var extras;
        if (status == 'success' && message == 'Approved') {
            if (this.subscription_plan == 'economy') {
                extras = { "preference_one": this.economy_first, "preference_two": this.economy_second };
            }
            else if (this.subscription_plan == 'standard') {
                extras = { "preference_one": this.standard_first, "preference_two": this.standard_second, "preference_three": this.standard_third, "preference_four": this.standard_forth };
            }
            //run spinner
            var orRef = firebase.database().ref("users/" + this.email.replace('.', ',') + "/orders");
            this.order_id = orRef.push().key;
            orRef.child(this.order_id).set({
                'id': this.order_id,
                'plan': this.package_type.toUpperCase(),
                'reference': this.reference,
                'transaction_number': trans,
                'amount_paid': "\u20A6" + this.amount_to_pay.substring(0, (this.amount_to_pay.length - 2)),
                'extras': extras,
                'status': status,
                'created_date': new Date().toLocaleDateString() + "." + new Date().toLocaleTimeString()
            }).then(function (prop) {
                var subject = 'A new order has been placed.';
                var em_body = "\n        Below are the information of the user--\n        USER: " + _this.name + "--\n        EMAIL ADDRESS: " + _this.email + "--\n        DELIVERY ADDRESS: " + _this.address + "--\n        PHONE NUMBER: " + _this.phone + "--\n        DELIVERY TIME: " + _this.delivery + " PM--\n        Below are the information of the order placed-- --\n        ORDER ID: " + _this.order_id + "--\n        PLAN: " + _this.package_type.toUpperCase() + "--\n        PAYMENT REFERENCE: " + _this.reference + "--\n        AMOUNT PAID: \u20A6" + _this.amount_to_pay.substring(0, (_this.amount_to_pay.length - 2)) + "--\n        " + ((_this.subscription_plan == 'economy') ? "FOOD PREFERENCES: " + _this.economy_first + "," + _this.economy_second + "--" : "FOOD PREFERENCES: " + _this.standard_first + "," + _this.standard_second + "," + _this.standard_third + "," + _this.standard_forth + "--") + "\n        ";
                var sendBody = _this.emailBody.Body(em_body, subject);
                console.log(sendBody);
                var url = "https://www.officekitchen.ng/emailsending/send.php?subject=" + subject + "&reply=" + _this.email + "&body=" + em_body;
                _this.http.get(url).subscribe(function (res) {
                    console.log(res);
                });
            }).catch(function (err) {
                _this.errorMessage = "" + err;
                _this.open(_this.errorContent_Payment, '', '');
            });
        }
        else {
            this.modalService.dismissAll();
            this.errorMessage = "Payment Failed. " + message;
            this.open(this.errorContent_Payment, '', '');
        }
        //console.log(paystackData);
        this.modalService.dismissAll();
        this.isSuccess = true;
        this.successMessage = 'Payment successful made and your order is processing';
    };
    MenuComponent.prototype.paymentCancel = function () {
        console.log('payment canceled');
    };
    MenuComponent.prototype.loginClick = function () {
        this.router.navigate(['/login']);
        this.modalService.dismissAll();
    };
    MenuComponent.prototype.getPublicKey = function () {
        var _this = this;
        firebase.database().ref('settings/keys/paystack_public_key').once('value', function (mKey) {
            _this.public_key = mKey.val();
        });
    };
    MenuComponent = __decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        }),
        __metadata("design:paramtypes", [NgbModal, Router, MatSnackBar, HttpClient])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
// <table role='presentation' border='0' cellpadding='0' cellspacing='0' class='btn btn-primary'>
//             <tbody>
//               <tr>
//                 <td align='left'>
//                   <table role='presentation' border='0' cellpadding='0' cellspacing='0'>
//                     <tbody>
//                       <tr>
//                         <td> <a href='mailto:${this.email}' target='_blank'>Send Message To User</a> </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//# sourceMappingURL=menu.component.js.map