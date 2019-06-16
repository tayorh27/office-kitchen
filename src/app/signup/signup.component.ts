import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router, RouterLink } from '@angular/router';

import { OverlayService } from '../overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    fullname:string = '';
    email:string = '';
    address:string = '';
    number:string = '';
    delivery:string = '';
    password:string = '';
    policy_accepted = false;
    isError:boolean = false;
    errorMessage = 'Hello';
    loadingText = 'Please wait...';

    test : Date = new Date();
    focus;
    focus1;
    focus2;

    // spinnerConfig:any = {
    //     bdOpacity: 0.3,
    //     bdColor: 'rgba(53,52,52,0.7)',
    //     size: 'medium',
    //     color: '#5e72e4',
    //     type: 'ball-atom',
    //     fullScreen: true
    // };

    constructor(private router:Router, private previewProgressSpinner: OverlayService) { }

    ngOnInit() {
        if(localStorage.getItem('logged') == 'true'){
            this.router.navigate(['/home']);
          }
    }

    onSubmit(form:NgForm) {
        if(this.isFieldFilled()){
            if(!this.policy_accepted){
                this.displayError('Please accept our policy.');
                return;
            }
            this.closeMessage();
            this.previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
            if(firebase.auth().currentUser){
                this.uploadToDatabase(firebase.auth().currentUser);
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(this.email.toLowerCase(), this.password).then(data => {
                this.uploadToDatabase(data.user);
            }).catch(err => {
                this.previewProgressSpinner.close();
                this.displayError(err);
            });
        }else {
            this.displayError('Please all fields must be filled.');
        }
    }

    uploadToDatabase(user:firebase.User) {
        firebase.database().ref('users').child(`${this.email.toLowerCase().replace('.',',')}`).child('signup').set({
            'fullname':this.fullname,
            'email':this.email.toLowerCase(),
            'address':this.address,
            'number':`${this.number}`,
            'delivery':this.delivery,
            'uid':user.uid,
            'created_date': `${new Date().toDateString()}.${new Date().toTimeString()}`
        }).then(prop => {
            this.previewProgressSpinner.close();
            localStorage.setItem('email', this.email.toLowerCase());
            localStorage.setItem('phone', this.number);
            localStorage.setItem('fullname', this.fullname);
            localStorage.setItem('address', this.address);
            localStorage.setItem('delivery', this.delivery);
            this.router.navigate(['/home']);
        }).catch(err => {
            this.previewProgressSpinner.close();
            this.displayError(err);
        });
    }

    isFieldFilled():boolean {
        if(this.fullname == '' || this.email == '' || this.address == '' || this.number == '' || this.delivery == '' || this.password == '') {
            return false;
        }else{
            return true;
        }
    }

    closeMessage() {
        this.isError = false;
        this.errorMessage = '';
    }

    displayError(message:string) {
        this.isError = true;
        this.errorMessage = message;
    }

    terms() {

    }
}
