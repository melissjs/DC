import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';



@Component({
  templateUrl: 'build/pages/demographics/demographics.html',
})
export class DemographicsPage {
enterSex: string;

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.setRoot(VoterecordPage, {
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

        onChangeSex(value){
        this.enterSex = value;
   }

}
