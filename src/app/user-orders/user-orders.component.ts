import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'Plan', 'Amount Paid', 'Created Date', 'Preferences', 'Status', 'View'];

  test: Date = new Date();
  focus;
  focus1;
  focus2;
  closeResult: string;

  total_orders = 0;
  failed_orders = 0;
  completed_orders = 0;

  all_orders = [];
  ordersRef: firebase.database.Query;

  order_fullname:string;
  order_email:string;
  order_number:string;
  order_delivery:string;
  order_address:string;
  order_id:string;


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
  email_number_yaba = "";
  email_number_lagos_island = "";
  email_number_ikeja = "";
  email_number_vi = "";
  email_number_lekki = "";
  email_number_others = "";
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
        const user_orders: {} = item['orders'];

        const user = {
          address: `${user_signup['address']}`,
          delivery: user_signup['delivery'],
          email: user_signup['email'],
          fullname: user_signup['fullname'],
          number: `${user_signup['number']}`,
        };
        //data collection
        // if(user_orders == null){
        //   this.email_number += (user.number.startsWith("+234")) ? `${user.number}\n` : `(+234)${user.number}\n`;
        //   this.reg = this.reg + 1;
        // }

        //data collection

        if (user_orders != null) {
          for (const [key, _order] of Object.entries(user_orders)) {
            this.all_orders.push(_order);
            var _extras: {} = _order['extras'];
            var prefs = '';
            if (_order['plan'] == 'ECONOMY-WEEK' || _order['plan'] == 'ECONOMY-MONTH') {
              prefs = `${_extras['preference_one']},${_extras['preference_two']}`;
            }
            if (_order['plan'] == 'STANDARD-WEEK' || _order['plan'] == 'STANDARD-MONTH') {
              prefs = `${_extras['preference_one']},${_extras['preference_two']},${_extras['preference_three']},${_extras['preference_four']}`;
            }
            this.elements.push({ id: index.toString(), plan: _order['plan'], amount: _order['amount_paid'], date: _order['created_date'], extras: prefs, status: (_order['admin_status'] == null) ? 'warning' : _order['admin_status'], order_id: _order['id'], user_signup:user});
            index = index + 1;

            if(user.address.toLowerCase().includes("ikoyi") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }

            if(user.address.toLowerCase().includes("yaba") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number_yaba += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }

            if(user.address.toLowerCase().includes("lagos island") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number_lagos_island += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }

            if(user.address.toLowerCase().includes("ikeja") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number_ikeja += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }

            if(user.address.toLowerCase().includes("lekki") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number_lekki += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }

            if(user.address.toLowerCase().includes("vi") && `${_order['plan']}`.toLowerCase().startsWith("standard") || user.address.toLowerCase().includes("victoria island") && `${_order['plan']}`.toLowerCase().startsWith("standard")){
              this.email_number_vi += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
              //this.reg = this.reg + 1;
            }
            // if(!user.address.toLowerCase().includes("vi") || !user.address.toLowerCase().includes("victoria island") || !user.address.toLowerCase().includes("lekki") || !user.address.toLowerCase().includes("ikeja") || !user.address.toLowerCase().includes("yaba") || !user.address.toLowerCase().includes("lagos island") || !user.address.toLowerCase().includes("ikoyi")) {
            //   this.email_number_others += `${this.reg} - ${user.fullname} - ${user.email} - ${user.number} - ${user.address} - ${user.delivery} AM/PM\nORDER INFORMATION:\nPLAN: ${_order['plan']}, AMOUNT PAID: ${_order['amount_paid']}, DATE: ${_order['created_date']}, PREFERENCES: ${prefs}\n\n`;
            // }
          }
        }
      });

      this.total_orders = this.all_orders.length;
      const completed = this.all_orders.filter((item, index, array) => {
        return item['admin_status'] == 'success';
      })
      const failed = this.all_orders.filter(function (item, index, array) {
        return item['admin_status'] == 'failed';
      });
      this.completed_orders = completed.length;
      this.failed_orders = failed.length;

      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

      console.log("=================IKOYI==============\n\n");
      console.log(`${this.email_number}`);
      console.log("==============YABA=================\n\n");
      console.log(`${this.email_number_yaba}`);
      console.log("===============LAGOS ISLAND================\n\n");
      console.log(`${this.email_number_lagos_island}`);
      console.log("=================IKEJA==============\n\n");
      console.log(`${this.email_number_ikeja}`);
      console.log("=================VICTORIA ISLAND==============\n\n");
      console.log(`${this.email_number_vi}`);
      console.log("=================LEKKI==============\n\n");
      console.log(`${this.email_number_lekki}`);
      // console.log("=================others==============\n\n");
      // console.log(`${this.email_number_others}`);
      //console.log(`total = ${this.reg}`);
    });
  }

  updateOrderStatus(status, email, order_key) {
    firebase.database().ref(`users/${email.replace('.',',')}/orders/${order_key}`).update({'admin_status': status}).then((v) => {
      this.modalService.dismissAll();
    });
  }

  viewOrder(content, user_data, order_id) {
    this.order_fullname = user_data.fullname;
    this.order_email = user_data.email;
    this.order_number = user_data.number;
    this.order_delivery = user_data.delivery;
    this.order_address = user_data.address;
    this.order_id = order_id;
    this.open(content, 'Notification', '');
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: $reason';
    }
  }

}
