import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VotePage} from '../vote/vote';


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
