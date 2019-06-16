import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
    elements: any = [];
    previous: any = [];
    headElements = ['ID', 'Plan', 'Amount Paid', 'Created Date', 'Preferences', 'Status'];

    fullname = localStorage.getItem('fullname');
    email = localStorage.getItem('email');
    number = localStorage.getItem('phone');
    address = localStorage.getItem('address');
    delivery = localStorage.getItem('delivery');

    edit_profile = false;
    test: Date = new Date();
    focus;
    focus1;
    focus2;

    isError: boolean = false;
    isSuccess = false;
    errorMessage = '';
    successMessage = '';

    total_orders = 0;
    failed_orders = 0;
    completed_orders = 0;

    all_orders = [];
    ordersRef: firebase.database.Reference;

    constructor(private router: Router, private cdRef: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.callAfterViewInit();
    }

    callAfterViewInit() {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
    }

    ngOnInit() {
        this.getUserOrders();
    }

    ngOnDestroy() {
        this.ordersRef.off();
    }

    profileEdit() {
        this.edit_profile = true;
    }

    getUserOrders() {
        this.ordersRef = firebase.database().ref(`users/${this.email.replace('.', ',')}/orders`);
        this.ordersRef.on('value', snapshot => {
            this.all_orders = [];
            this.elements = [];
            var index = 1;
            snapshot.forEach((values) => {
                const item = values.val();
                this.all_orders.push(item);
                var _extras: {} = item['extras'];
                var prefs = '';
                if(item['plan'] == 'ECONOMY-WEEK' || item['plan'] == 'ECONOMY-MONTH'){
                   prefs = `${_extras['preference_one']},${_extras['preference_two']}`;
                }
                if(item['plan'] == 'STANDARD-WEEK' || item['plan'] == 'STANDARD-MONTH'){
                    prefs = `${_extras['preference_one']},${_extras['preference_two']},${_extras['preference_three']},${_extras['preference_four']}`;
                }
                this.elements.push({ id: index.toString(), plan: item['plan'], amount: item['amount_paid'], date: item['created_date'], extras: prefs, status: item['status'] });
                index = index + 1;
            });
            this.total_orders = this.all_orders.length;
            const completed = this.all_orders.filter((item, index, array) => {
                return item['status'] == 'success';
            })
            const failed = this.all_orders.filter(function (item, index, array) {
                return item['status'] == 'failed';
            });
            this.completed_orders = completed.length;
            this.failed_orders = failed.length;

            this.mdbTable.setDataSource(this.elements);
            this.elements = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();
        });
    }

    saveProfile() {
        if (this.isFieldFilled()) {
            firebase.database().ref(`users/${this.email.replace('.', ',')}/signup`).update({
                'fullname': this.fullname,
                'number': `${this.number}`,
                'address': this.address,
                'delivery': this.delivery
            }).then(prop => {
                localStorage.setItem('phone', this.number);
                localStorage.setItem('fullname', this.fullname);
                localStorage.setItem('address', this.address);
                localStorage.setItem('delivery', this.delivery);
                this.edit_profile = false;
                this.displaySuccess('Updated successfully');
            }).catch(err => {
                this.displayError(err);
            })
        } else {
            this.displayError('Please all fields must be filled.');
        }
    }

    cancelEditProfile() {
        this.edit_profile = false;
        this.fullname = localStorage.getItem('fullname');
        this.email = localStorage.getItem('email');
        this.number = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');
        this.delivery = localStorage.getItem('delivery');
    }

    logout() {
        firebase.auth().signOut().then(prop => {
            this.router.navigate(['/home']);
        });
    }

    isFieldFilled(): boolean {
        if (this.fullname == '' || this.email == '' || this.address == '' || this.number == '' || this.delivery == '') {
            return false;
        } else {
            return true;
        }
    }

    closeMessage() {
        this.isSuccess = false
        this.isError = false;
        this.errorMessage = '';
        this.successMessage = '';
    }

    displaySuccess(message: string) {
        this.isError = false;
        this.isSuccess = true;
        this.successMessage = message;
    }

    displayError(message: string) {
        this.isSuccess = false;
        this.isError = true;
        this.errorMessage = message;
    }

}
