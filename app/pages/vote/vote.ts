import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';

@Component({
  templateUrl: 'build/pages/vote/vote.html'
})
export class VotePage {
    presVote: string;
    presVoteCastBy: string;
    presVoteLOS: string;
    pimaryPresVote: string;
    pimaryPresVoteCastBy: string;
    primaryPresVoteLOS: string;
    firstPresVote: string;
    secondPresVote: string;
    thirdPresVote: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.presVote = null;
        this.presVoteCastBy = null;
        this.presVoteLOS = null;
        this.pimaryPresVote = null;
        this.pimaryPresVoteCastBy = null;
        this.primaryPresVoteLOS = null;
        this.firstPresVote = null;
        this.secondPresVote = null;
        this.thirdPresVote = null;
    }

    onSubmit() {
        var that = this;
        try {
            if (this.presVote == null) {
                let alert = this.alertCtrl.create({
                    title: 'No Presidential Vote Selected!',
                    subTitle: 'Please Make a Selection',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                that.navCtrl.push(DemographicsPage, {
                });
            }

        } catch (EE) {
            let alert = this.alertCtrl.create({
                title: 'error in Submitting',
                subTitle: EE.toString(),
                buttons: ['OK']
            });
            alert.present();
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }

        onChangePresVote(value){
        this.presVote = value;
        console.log(this.presVote);
   }

       onChangePresVoteCastBy(value){
        this.presVoteCastBy = value;
   }

       onChangePresVoteLOS(value){
        this.presVoteLOS = value;
   }

       onChangePrimaryPresVote(value){
        this.pimaryPresVote = value;
   }

       onChangePrimaryPresVoteCastBy(value){
        this.pimaryPresVoteCastBy = value;
   }

       onChangePrimaryPresVoteLOS(value){
        this.primaryPresVoteLOS = value;
   }

          onChangeFirstPresVote(value){
        this.firstPresVote = value;
   }

          onChangeSecondPresVote(value){
        this.secondPresVote = value;
   }

          onChangeThirdPresVote(value){
        this.thirdPresVote = value;
   }

}
