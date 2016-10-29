import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {VoteRecord} from '../../voterecord';


@Component({
  templateUrl: 'build/pages/vote/vote.html'
})
export class VotePage {
    presVote: string;
    presVoteWriteIn: string;
    presVoteCastBy: string;
    presVoteLOS: string;
    primaryPresVote: string;
    primaryPresVoteWriteIn: string;
    primaryLocation: string;
    primaryPresVoteCastBy: string;
    primaryPresVoteLOS: string;
    firstPresVote: string;
    secondPresVote: string;
    thirdPresVote: string;
    reasonForCouldNotVotePrimary: string;
    otherReasonForCouldNotVotePrimary: string;
    intendedToVoteFor: string;
    intendedToVoteForWriteIn: string;
    volunteerservice: Volunteerservice;
    recordservice: Recordservice;
    newVoteRecord: VoteRecord;
    firstPresVoteWriteIn: string;
    secondPresVoteWriteIn: string;
    thirdPresVoteWriteIn: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, volunteerservice: Volunteerservice, recordservice: Recordservice) {
        this.navCtrl = navCtrl;
        this.presVote = null;
        this.presVoteWriteIn = null;
        this.presVoteCastBy = null;
        this.presVoteLOS = null;
        this.primaryPresVote = null;
        this.primaryPresVoteWriteIn = null;
        this.primaryPresVoteCastBy = null;
        this.primaryPresVoteLOS = null;
        this.primaryLocation = null;
        this.firstPresVote = null;
        this.secondPresVote = null;
        this.thirdPresVote = null;
        this.reasonForCouldNotVotePrimary = null;
        this.intendedToVoteFor = null;
        this.volunteerservice = volunteerservice;
        this.recordservice = recordservice;
        this.newVoteRecord = this.recordservice.createVoidVoteRecord();
        this.firstPresVoteWriteIn = null;
        this.secondPresVoteWriteIn = null;
        this.thirdPresVoteWriteIn = null;
    }

        onChangePresVote(value){
        this.presVote = value;
        console.log(this.presVote);
   }

        onChangePresVoteWriteIn(passedPresVoteWriteIn){
        this.presVoteWriteIn = passedPresVoteWriteIn;

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

      onChangePrimaryPresVoteWriteIn(passedPrimaryPresVoteWriteIn){
          this.primaryPresVoteWriteIn = passedPrimaryPresVoteWriteIn;

   }

      onChangePrimaryLocation(passedPrimaryLocation){
          this.primaryLocation = passedPrimaryLocation;

   }

      onChangeReasonForCouldNotVotePrimary(passedReasonForCouldNotVotePrimary){
          this.reasonForCouldNotVotePrimary = passedReasonForCouldNotVotePrimary;
  }

     onChangeOtherReasonForCouldNotVotePrimary(passedOtherReasonForCouldNotVotePrimary){
         this.otherReasonForCouldNotVotePrimary = passedOtherReasonForCouldNotVotePrimary;
  }

     onChangeIntendedToVoteFor(passedIntendedToVoteFor){
        this.intendedToVoteFor = passedIntendedToVoteFor;
    }

    onChangeIntendedToVoteForWriteIn(passedIntendedToVoteForWriteIn){
        this.intendedToVoteForWriteIn = passedIntendedToVoteForWriteIn;
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

        onChangeFirstPresVoteWriteIn(passedFirstPresVoteWriteIn){
        this.firstPresVoteWriteIn = passedFirstPresVoteWriteIn;
   }

          onChangeSecondPresVote(value){
        this.secondPresVote = value;
   }

        onChangeSecondPresVoteWriteIn(passedSecondPresVoteWriteIn){
        this.secondPresVoteWriteIn = passedSecondPresVoteWriteIn;
   }

          onChangeThirdPresVote(value){
        this.thirdPresVote = value;
   }

        onChangeThirdPresVoteWriteIn(passedThirdPresVoteWriteIn){
        this.thirdPresVoteWriteIn = passedThirdPresVoteWriteIn;
   }

    onSubmit() {
        var that = this;
        try {
            if (this.presVote == null || this.presVoteCastBy == null || (this.presVote=='writeIn' && this.presVoteWriteIn==null)) {
                let alert = this.alertCtrl.create({
                    title: 'President and cast by selections are required.',
                    subTitle: 'Please select the candidate you voted for today and specify how you cast your vote, everything else on this page is optional.',
                    buttons: ['OK']
                });
                alert.present();
            } else {

            // logic for write ins
            if(this.presVote == 'writeIn'){
                this.presVote = this.presVoteWriteIn;
            }

            if(this.primaryPresVote == 'writeIn'){
                this.primaryPresVote = this.primaryPresVoteWriteIn;
            }

            if(this.reasonForCouldNotVotePrimary == 'otherReasonForCouldNotVotePrimary'){
                this.reasonForCouldNotVotePrimary = this.otherReasonForCouldNotVotePrimary;
            }

            if(this.firstPresVote == 'writeIn'){
            this.firstPresVote = this.firstPresVoteWriteIn;
            }

            if(this.secondPresVote == 'writeIn'){
            this.secondPresVote = this.secondPresVoteWriteIn;
            }

            if(this.thirdPresVote == 'writeIn'){
            this.thirdPresVote = this.thirdPresVoteWriteIn;
            }



            // fill object
            this.newVoteRecord = {
            voteRecordKey: this.recordservice.generateNextVoteNumber(),
            volunteerKey: this.volunteerservice.getNewVolunteerKey(),
            gePresVote: this.presVote,
            gePresVoteCastBy: this.presVoteCastBy,
            gePresVoteLevelOfSupport: this.presVoteLOS,
            pPresVoteCouldNotVoteReason: this.reasonForCouldNotVotePrimary,
            pPresVoteIntended: this.intendedToVoteFor,
            pPresVote: this.primaryPresVote,
            pPresVoteCastBy: this.primaryPresVoteCastBy,
            pPresVoteLevelOfSupport: this.primaryPresVoteLOS,
            pPresVotePollingLocation: this.primaryLocation,
            presFirst: this.firstPresVote,
            presSecond: this.secondPresVote,
            presThird: this.thirdPresVote,
            }
            console.log(this.newVoteRecord );

                that.navCtrl.setRoot(DemographicsPage, {
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

}
