import { CanActivate, CanDeactivate } from "@angular/router";
import * as firebase from 'firebase';


export class RouteGuard implements CanActivate {

    canActivate() {
        if(firebase.auth().currentUser){
        return true;
        }else{
            return false;
        }
    }
}

export class RouteOrderGuard implements CanActivate {

    canActivate() {
        const email = localStorage.getItem('email').toString();
        //console.log(email);
        if(email == null){
            //console.log("nulltrue");
            return false;
        }
        if(email == "ibukunolaoye@gmail.com"){//firebase.auth().currentUser && 
            //console.log("true");
            return true;
        }else{
            //console.log("nullfalse");
            return false;
        }
    }
}