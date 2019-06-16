import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatSnackBar, MatSelect } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { EmailBody } from "../email-body";

import { OverlayService } from '../overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  durationInSeconds = 5;
  email = localStorage.getItem('email');
  name = localStorage.getItem('fullname');
  phone = localStorage.getItem('phone');
  address = localStorage.getItem('address');
  delivery = localStorage.getItem('delivery');

  amount_to_pay = '';
  public_key = 'pk_live_bec008be3804b9e226c276b470ac83e18a903dfa';//'pk_test_fe5e7a92b2ac1e14defe1172eec62d743f974915';//
  reference = `${Math.random() * 100000000000000000}`;
  isLoggedIn = false;
  closeResult: string;
  selected_plan = '';
  subscription_plan = '';
  economy_first = '';
  economy_second = '';
  standard_first = '';
  standard_second = '';
  standard_third = '';
  standard_forth = '';
  errorContent_Payment: any;
  errorMessage = '';
  package_type = '';
  order_id = '';
  isSuccess = false;
  successMessage = '';
  //standard_fifth = '';

  emailBody = new EmailBody();

  economy_foods_first_option: Food[] = [
    { value: 'Amala', viewValue: 'Amala' },
    { value: 'Eba', viewValue: 'Eba' },
    { value: 'Fufu', viewValue: 'Fufu' }
  ];

  economy_foods_second_option: Food[] = [
    { value: 'Fried-Egg', viewValue: 'Fried Egg' },
    { value: 'Egg-Sauce', viewValue: 'Egg Sauce' }
  ];

  standard_foods_first_option: Food[] = [
    { value: 'Jollof-Rice', viewValue: 'Jollof Rice' },
    { value: 'Fried-Rice', viewValue: 'Fried Rice' }
  ];

  standard_foods_second_option: Food[] = [
    { value: 'Chicken', viewValue: 'Chicken' },
    { value: 'Turkey', viewValue: 'Turkey' },
    { value: 'Fish', viewValue: 'Fish' }
  ];

  standard_foods_third_option: Food[] = [
    { value: 'White-Rice', viewValue: 'White Rice' },
    { value: 'Ofada-Rice', viewValue: 'Ofada Rice' }
  ];

  standard_foods_forth_option: Food[] = [
    { value: 'Amala', viewValue: 'Amala' },
    { value: 'Eba', viewValue: 'Eba' },
    { value: 'Fufu', viewValue: 'Fufu' },
    { value: 'Semo', viewValue: 'Semo' },
    { value: 'Wheat', viewValue: 'Wheat' },
    { value: 'Pounded-yam', viewValue: 'Pounded yam' }
  ];

  // standard_foods_fifth_option: Food[] = [
  //   { value: 'Chicken', viewValue: 'Chicken' },
  //   { value: 'Turkey', viewValue: 'Turkey' },
  //   { value: 'Fish', viewValue: 'Fish' }
  // ];

  constructor(private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private http: HttpClient, private previewProgressSpinner: OverlayService) {
    //this.getPublicKey();
   }

  ngOnInit() {
    if (localStorage.getItem('logged') == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  buyNowClicked(package_type: string, content, errorContent, errorContent_Payment) {
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

  sendToPayment() {
    console.log(this.economy_first);
  }

  paymentDone(paystackData: any) {
    const status = paystackData['status'];
    const message = paystackData['message'];
    const trans = paystackData['trans'];
    var extras: any;
    if (status == 'success' && message == 'Approved') {
      this.modalService.dismissAll();
      this.previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
      if (this.subscription_plan == 'economy') {
        extras = { "preference_one": this.economy_first, "preference_two": this.economy_second };
      } else if (this.subscription_plan == 'standard') {
        extras = { "preference_one": this.standard_first, "preference_two": this.standard_second, "preference_three": this.standard_third, "preference_four": this.standard_forth };
      }
      //run spinner
      const orRef = firebase.database().ref(`users/${this.email.replace('.', ',')}/orders`);
      this.order_id = orRef.push().key;
      orRef.child(this.order_id).set({
        'id':this.order_id,
        'plan': this.package_type.toUpperCase(),
        'reference': this.reference,
        'transaction_number': trans,
        'amount_paid': `₦${this.amount_to_pay.substring(0, (this.amount_to_pay.length - 2))}`,
        'extras': extras,
        'status': status,
        'created_date': `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      }).then(prop => {
        const subject = 'New Order Alert.';
        const em_body = `
        Below are the information of the user--
        USER: ${this.name}--
        EMAIL ADDRESS: ${this.email}--
        DELIVERY ADDRESS: ${this.address}--
        PHONE NUMBER: ${this.phone}--
        DELIVERY TIME: ${this.delivery} PM--
        Below are the information of the order placed-- --
        ORDER ID: ${this.order_id}--
        PLAN: ${this.package_type.toUpperCase()}--
        PAYMENT REFERENCE: ${this.reference}--
        AMOUNT PAID: ₦${this.amount_to_pay.substring(0, (this.amount_to_pay.length - 2))}--
        ${(this.subscription_plan == 'economy') ? `FOOD PREFERENCES: ${this.economy_first},${this.economy_second}--` : `FOOD PREFERENCES: ${this.standard_first},${this.standard_second},${this.standard_third},${this.standard_forth}--`}
        `;
        const _prefs = (this.subscription_plan == 'economy') ? `${this.economy_first},${this.economy_second}` : `${this.standard_first},${this.standard_second},${this.standard_third},${this.standard_forth}`;
        const amt_paid = `₦${this.amount_to_pay.substring(0, (this.amount_to_pay.length - 2))}`;
        const order_text = `Order ${this.order_id} placed on ${new Date().toLocaleDateString()}`;

        // const sendBody = this.emailBody.Body(em_body, subject);
        // console.log(sendBody);
        
        const url = `https://mail.officekitchen.ng/send.php?order_item=${this.package_type.toUpperCase()}&order_desc=${_prefs}&order_price=${amt_paid}&order_text=${order_text}&username=${this.name}&useremail=${this.email}&reply=${this.email}&body=${em_body}`;
        //const guoet = this.emailBody.getUserOrderFeedbackEmailTemplateCode(this.package_type.toUpperCase(), _prefs, amt_paid, order_text);
        //const url = `https://mail.officekitchen.ng/emailsending/send.php?getUserOrderFeedbackEmailTemplateCode=${guoet}&username=${this.name}&useremail=${this.email}&reply=${this.email}`;
        //console.log(url);

        this.http.get(url).subscribe(res => {
          this.previewProgressSpinner.close();
          this.isSuccess = true;
          this.successMessage = 'Payment successful made and your order is processing';
        }, err => {
          this.previewProgressSpinner.close();
          this.isSuccess = true;
          this.successMessage = 'Payment successful made and your order is processing';
        });
      }).catch(err => {
        this.previewProgressSpinner.close();
        this.errorMessage = `${err}`;
        this.open(this.errorContent_Payment, '', '');
      })
    } else {
      this.modalService.dismissAll();
      this.errorMessage = `Payment Failed. ${message}`;
      this.open(this.errorContent_Payment, '', '');
    }
    //console.log(paystackData);
  }

  paymentCancel() {
    this.modalService.dismissAll();
      this.errorMessage = 'Payment has been canceled by you.';
      this.open(this.errorContent_Payment, '', '');
  }

  loginClick() {
    this.router.navigate(['/login']);
    this.modalService.dismissAll();
  }

  getPublicKey() {
    firebase.database().ref('settings/keys/paystack_public_key').once('value', (mKey) => {
      this.public_key = mKey.val();
    });
  }

  closeMessage() {
    this.isSuccess = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

}

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
