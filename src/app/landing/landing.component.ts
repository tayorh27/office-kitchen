import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { EmailBody } from '../email-body';

import { OverlayService } from '../overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  name = '';
  email = '';
  number = '';
  message = '';
  showSpinner = true;
  isError:boolean = false;
  isSuccess = false;
  errorMessage = '';
  successMessage = '';
  closeResult:string;
  _timer = timer(5000);

  @ViewChild('classic3') private container: ElementRef;

  emailBody = new EmailBody();

  constructor(config: NgbCarouselConfig, private http: HttpClient, private previewProgressSpinner: OverlayService, private modalService: NgbModal, private router: Router) { 
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

  ngOnInit() {
    this.displayDiscountView();
  }

  displayDiscountView() {
    const getViewed = localStorage.getItem("viewed");
    if(getViewed == null){
      this._timer.subscribe(x => {
        this.open(this.container, '', '');
      })
    }
  }

  orderNow() {
    this.modalService.dismissAll();
    localStorage.setItem("viewed", "true");
    this._timer.subscribe().unsubscribe();
    this.router.navigate(['/menu']);
  }

  clearFields() {
    this.name = '';
    this.email = '';
    this.number = '';
    this.message = '';
  }

  sendMessage() {
    this.closeMessage();
    if(!this.isFieldFilled()){
      this.displayError('All fields must be filled.');
      return;
    }
    this.previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    const subject = 'Contact us message';
    const em_body = `
    Below are the information of the user--
    FULL NAME: ${this.name}--
    EMAIL ADDRESS: ${this.email}--
    PHONE NUMBER: ${this.number}--
    MESSAGE: ${this.message}--
    `;
    //const sendBody = this.emailBody.Body(em_body, subject);
    const url = `https://mail.officekitchen.ng/contact.php?subject=${subject}&body=${em_body}&reply=${this.email}`;
    this.http.get(url).subscribe(res => {
      this.previewProgressSpinner.close();
      this.clearFields();
      this.displaySuccess('Message sent successfully.');
    }, err => {
      this.previewProgressSpinner.close();
      this.clearFields();
      this.displaySuccess('Message sent successfully.');
    });
  }

  isFieldFilled():boolean {
    if(this.email == '' || this.number == '' || this.message == '' || this.name == '') {
        return false;
    }else{
        return true;
    }
}

  closeMessage() {
    this.isSuccess = false
    this.isError = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  displaySuccess(message:string) {
    this.isError = false;
    this.isSuccess = true;
    this.successMessage = message;
  }
  
  displayError(message:string) {
    this.isSuccess = false;
    this.isError = true;
    this.errorMessage = message;
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

}
