import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VotePage} from '../vote/vote';
/*
  Generated class for the AffidavitPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/affidavit/affidavit.html',
})
export class AffidavitPage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

      onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(VotePage, {
            })

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
