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
    primaryPresVote: string;
    primaryPresVoteCastBy: string;
    primaryPresVoteLOS: string;
    firstPresVote: string;
    secondPresVote: string;
    thirdPresVote: string;
    reasonForCouldNotVotePrimary: string;
    reasonForCouldNotVotePGE: string;
    intendedToVoteFor: string;
    intendedToVoteForPGE: string;
    presVoteLOSPWI: string;
    presVoteLOSWI: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.presVote = null;
        this.presVoteCastBy = null;
        this.presVoteLOS = null;
        this.primaryPresVote = null;
        this.primaryPresVoteCastBy = null;
        this.primaryPresVoteLOS = null;
        this.firstPresVote = null;
        this.secondPresVote = null;
        this.thirdPresVote = null;
        this.reasonForCouldNotVotePrimary = null;
        this.reasonForCouldNotVotePGE = null;
        this.intendedToVoteFor = null;
        this.intendedToVoteForPGE = null;
        this.presVoteLOSPWI = null;
        this.presVoteLOSWI = null;
    }

    onSubmit() {
        var that = this;
        try {
            if (this.presVote == null || this.presVoteCastBy == null ) {
                let alert = this.alertCtrl.create({
                    title: 'The top two selections are required.',
                    subTitle: 'Please select the candidate you voted for today and specify how you cast your vote, everything else on this page is optional.',
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
/*
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
        this.primaryPresVote = value;
   }

       onChangePrimaryPresVoteCastBy(value){
        this.primaryPresVoteCastBy = value;
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
*/
}
