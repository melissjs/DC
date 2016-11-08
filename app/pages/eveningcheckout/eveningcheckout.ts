import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EndPage } from '../end/end';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {CheckLogin } from '../../components/check-login/check-login';

@Component({
  templateUrl: 'build/pages/eveningcheckout/eveningcheckout.html',
  directives: [CheckLogin],
})
export class EveningcheckoutPage {

    constructor(private navCtrl: NavController, private recordservice: Recordservice) {
    }

    onSubmit() {
        var that = this;

	that.recordservice.onLogout(this,this.displayError, this.successLogout);

    }

    displayError(that:any,text: string,subtitle: string) {
        that.errorMessage = text + ':' + subtitle;
    }

    successLogout(that: any, real:boolean) {
        try {
            that.navCtrl.setRoot(EndPage, {
            })
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
