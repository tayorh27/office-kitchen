import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-user-signups',
  templateUrl: './user-signups.component.html',
  styleUrls: ['./user-signups.component.css']
})
export class UserSignupsComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Full Name', 'Email', 'Number', 'Delivery Time', 'Delivery Address', 'Created Date', 'Action'];

  test: Date = new Date();
  focus;
  focus1;
  focus2;
  search_email: string = '';

  total_orders = 0;
  failed_orders = 0;
  completed_orders = 0;

  all_orders = [];
  ordersRef: firebase.database.Reference;

  view_order = false;

  constructor(private modalService: NgbModal, private router: Router, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.callAfterViewInit();
  }

  callAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
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
  email_number = "";
  reg = 1;
  getUserOrders() {

    this.ordersRef = firebase.database().ref(`users`);
    this.ordersRef.on('value', snapshot => {
      this.all_orders = [];
      this.elements = [];
      var index = 1;
      snapshot.forEach((values) => {
        const item = values.val();

        const user_signup = item['signup'];

        const user = {
          id: index.toString(),
          address: `${user_signup['address']}`,
          delivery: `${user_signup['delivery']}`,
          email: `${user_signup['email']}`,
          name: `${user_signup['fullname']}`,
          number: `${user_signup['number']}`,
          created: `${user_signup['created_date']}`
        };
        
        // if (user.created.includes("May 08") || user.created.includes("May 09")) {
        //   this.email_number += `${user.name}-${user.email}-${user.number}\n`;
        //   this.reg = this.reg + 1;
        // }

        this.all_orders.push(user);

        this.elements.push({ id: index.toString(), name: user.name, email: user.email, number: user.number, delivery: `${user.delivery} PM`, address: user.address, created: user.created });
        index = index + 1;

      });
      this.total_orders = this.elements.length;

      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

      //console.log(`hello = ${this.email_number} = ${this.reg}`);
    });

  }

  searching() {
    localStorage.setItem('search_box', this.search_email);
    if (localStorage.getItem('search_box').length <= 0) {
      this.mdbTable.setDataSource(this.all_orders);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      return;
    }
    if (this.search_email != undefined) {
      const search_result = this.all_orders.filter(function (item, index, array) {
        return item['number'] == `${localStorage.getItem('search_box')}`;
      });
      this.mdbTable.setDataSource(search_result);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }
  }

  viewUserOrders(email) {
    this.view_order = true;
  }

  goBack(){
    this.view_order = false;
  }

}
