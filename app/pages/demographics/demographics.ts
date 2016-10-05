import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';



@Component({
  templateUrl: 'build/pages/demographics/demographics.html',
})
export class DemographicsPage {
enterSex: string;
enterAge: string;
enterIncome: string;
enterParty: string;
enterEthnicity: string;
enterFirstTimeVoter: string;

  constructor(private navCtrl: NavController) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  this.enterAge = null;
  this.enterIncome = null;
  this.enterParty = null;
  this.enterEthnicity = null;
  this.enterFirstTimeVoter = null;
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

           onChangeAge(value){
        this.enterAge = value;
   }

           onChangeIncome(value){
        this.enterIncome = value;
   }

              onChangeParty(value){
        this.enterParty = value;
   }

              onChangeEthnicity(value){
        this.enterEthnicity = value;
   }

              onChangeFirstTimeVoter(value){
        this.enterFirstTimeVoter = value;
   }

}
