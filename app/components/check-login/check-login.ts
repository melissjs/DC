import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationPage } from '../../pages/authentication/authentication';
import { LoginPageMa } from '../../pages/loginpagema/loginpagema';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {RestService} from '../../providers/rest-service/rest-service';

/*
  Generated class for the CheckLogin component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'check-login',
  templateUrl: 'build/components/check-login/check-login.html'
})
export class CheckLogin {

    constructor(private navCtrl: NavController, private restSvc: RestService, private recordservice: Recordservice) {
    }

    onSubmitAuthenticate() {
        var that = this;
        try {
            that.navCtrl.push(AuthenticationPage, {
            })
        } catch (EE) {
            console.log('error in Submitting authentication, exc='+ EE.toString())
        } 
    }

    onSubmitLogin() {
        var that = this;
        try {
            that.navCtrl.push(LoginPageMa, {
            })
        } catch (EE) {
            console.log('error in Submitting login, exc='+ EE.toString())
        } 
    }
}
