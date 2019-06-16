import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { OverlayService } from '../overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password:string = '';
  isError:boolean = false;
  isSuccess = false;
  errorMessage = '';
  successMessage = '';
  loadingText = 'Please wait...';

  focus;
  focus1;
  
  spinnerConfig: object = {
    bdOpacity: 0.3,
    bdColor: '#333',
    size: 'medium',
    color: '#000',
    type: 'ball-8bits',
    fullScreen: true
};

constructor(private router:Router, private previewProgressSpinner: OverlayService) { }

  ngOnInit() {
    if(localStorage.getItem('logged') == 'true'){
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form:NgForm) {
    if(this.isFieldFilled()){
        this.closeMessage();
        this.previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
        if(firebase.auth().currentUser){
          this.retrieveDataFromBase(firebase.auth().currentUser);
          return;
        }
        firebase.auth().signInWithEmailAndPassword(this.email.toLowerCase(), this.password).then(data => {
            this.retrieveDataFromBase(data.user);
        }).catch(err => {
          this.previewProgressSpinner.close();
            this.displayError(err);
        });
    }else {
        this.displayError('Please all fields must be filled.');
    }
  }

  retrieveDataFromBase(user:firebase.User) {
      const email = user.email.toLowerCase().replace('.',',');
      firebase.database().ref(`users/${email}/signup`).once('value', (snapshot) => {
        const values = snapshot.val();
        localStorage.setItem('email', values['email']);
        localStorage.setItem('phone', values['number']);
        localStorage.setItem('fullname', values['fullname']);
        localStorage.setItem('address', values['address']);
        localStorage.setItem('delivery', values['delivery']);
      }).then(prop => {
        this.previewProgressSpinner.close();
        this.router.navigate(['/menu']);
      }).catch(err => {
        this.previewProgressSpinner.close();
        this.displayError(err);
      });
  }

  forgotpassword() {
    if(this.email == ''){
      this.displayError('Please enter your email address');
      return;
    }
    this.closeMessage();
    this.previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    firebase.auth().sendPasswordResetEmail(this.email).then(prop => {
      this.previewProgressSpinner.close();
      this.displaySuccess('Password reset instruction has been sent to your email.');
    }).catch(err => {
      this.previewProgressSpinner.close();
      this.displayError(err);
    })
  }

  isFieldFilled():boolean {
    if(this.email == '' || this.password == '') {
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

}
