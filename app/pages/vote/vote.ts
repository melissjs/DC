import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {LevelofsupportComponent} from '../levelofsupport/levelofsupport';

@Component({
  templateUrl: 'build/pages/vote/vote.html',
  directives: [LevelofsupportComponent],
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

   onFocusLOSGE(yesOrNo){
       var isFocusedOn = yesOrNo;
       if (isFocusedOn == "yes"){
       return "yes";}
   }

}
