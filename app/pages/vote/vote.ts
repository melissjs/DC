import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';


@Component({
  templateUrl: 'build/pages/vote/vote.html',
})
export class VotePage {

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  }

    onSubmit() {
        var that = this;
        try {
            that.navCtrl.push(DemographicsPage, {
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

}
