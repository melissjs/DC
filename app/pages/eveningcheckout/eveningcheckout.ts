import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EndPage } from '../end/end';

@Component({
  templateUrl: 'build/pages/eveningcheckout/eveningcheckout.html',
})
export class EveningcheckoutPage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

      onSubmit() {
        var that = this;
        try {
            that.navCtrl.setRoot(EndPage, {
            })

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }
    

}
