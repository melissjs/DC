import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AffidavitPage} from '../affidavit/affidavit';


@Component({
  templateUrl: 'build/pages/voterecord/voterecord.html',
})
export class VoterecordPage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }


      onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(AffidavitPage, {
            })

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }


}
