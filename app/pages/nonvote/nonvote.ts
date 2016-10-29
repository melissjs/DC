import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {NonvoteRecord} from '../../nonvoterecord';

@Component({
  templateUrl: 'build/pages/nonvote/nonvote.html'
})
export class NonvotePage {
    reasonForCouldNotVotePGE: string;
    otherReasonForCouldNotVotePGE: string;
    intendedToVoteForPGE: string;
    intendedToVoteForPGEWriteIn: string;
    presVoteLOS: string;
    primaryPresVote: string;
    primaryPresVoteWriteIn: string;
    primaryLocation: string;
    reasonForCouldNotVotePrimary: string;
    otherReasonForCouldNotVotePrimary: string;
    intendedToVoteForPrimary: string;
    intendedToVoteForPrimaryWriteIn: string;
    primaryPresVoteCastBy: string;
    primaryPresVoteLOS: string;
    firstPresVote: string;
    secondPresVote: string;
    thirdPresVote: string; 
    volunteerservice: Volunteerservice;
    recordservice: Recordservice;
    newNonVoteRecord: NonvoteRecord;
    firstPresVoteWriteIn: string;
    secondPresVoteWriteIn: string;
    thirdPresVoteWriteIn: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, volunteerservice: Volunteerservice, recordservice: Recordservice) {
        this.navCtrl = navCtrl;
        this.presVoteLOS = null;
        this.primaryPresVote = null;
        this.primaryPresVoteCastBy = null;
        this.primaryPresVoteLOS = null;
        this.primaryLocation = null;
        this.firstPresVote = null;
        this.secondPresVote = null;
        this.thirdPresVote = null;
        this.reasonForCouldNotVotePrimary = null;
        this.reasonForCouldNotVotePGE = null;
        this.intendedToVoteForPrimary = null;
        this.intendedToVoteForPGE = null;
        this.volunteerservice = volunteerservice;
        this.recordservice = recordservice;
        this.newNonVoteRecord = this.recordservice.createVoidNonVoteRecord();
        this.firstPresVoteWriteIn = null;
        this.secondPresVoteWriteIn = null;
        this.thirdPresVoteWriteIn = null;
        this.otherReasonForCouldNotVotePGE = null;
        this.intendedToVoteForPGEWriteIn = null;
        this.primaryPresVoteWriteIn = null;
        this.otherReasonForCouldNotVotePrimary = null;
        this.intendedToVoteForPrimaryWriteIn = null;
        
    }

       onChangeReasonForCouldNotVotePGE(value){
        this.reasonForCouldNotVotePGE = value;
   }

       onChangeOtherReasonForCouldNotVotePGE(value){
        this.otherReasonForCouldNotVotePGE = value;
   }

        onChangeIntendedToVoteForPGE(value){
        this.intendedToVoteForPGE = value;
   }

        onChangeIntendedToVoteForPGEWriteIn(value){
        this.intendedToVoteForPGEWriteIn = value;
   }

       onChangePresVoteLOS(value){
        this.presVoteLOS = value;
   }

       onChangePrimaryPresVote(value){
        this.primaryPresVote = value;
   }

        onChangePrimaryPresVoteWriteIn(value){
        this.primaryPresVoteWriteIn = value;
   }

        onChangePrimaryLocation(value){
        this.primaryLocation = value;
   }

        onChangeReasonForCouldNotVotePrimary(value){
        this.reasonForCouldNotVotePrimary = value;
   }

        onChangeOtherReasonForCouldNotVotePrimary(value){
        this.otherReasonForCouldNotVotePrimary = value;
   }

        onChangeIntendedToVoteForPrimary(value){
        this.intendedToVoteForPrimary = value;
   }

        onChangeIntendedToVoteForPrimaryWriteIn(value){
        this.intendedToVoteForPrimaryWriteIn = value;
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

        onChangeFirstPresVoteWriteIn(value){
        this.firstPresVoteWriteIn = value;
   }
          onChangeSecondPresVote(value){
        this.secondPresVote = value;
   }

        onChangeSecondPresVoteWriteIn(value){
        this.secondPresVoteWriteIn = value;
   }

          onChangeThirdPresVote(value){
        this.thirdPresVote = value;
   }

        onChangeThirdPresVoteWriteIn(value){
        this.thirdPresVoteWriteIn = value;
   }

    onSubmit() {
        var that = this;
        try {
            if (this.reasonForCouldNotVotePGE == null || this.intendedToVoteForPGE == null || (this.reasonForCouldNotVotePGE == 'otherReasonForCouldNotVotePGE' && this.otherReasonForCouldNotVotePGE==null) || (this.intendedToVoteForPGE == 'writeIn' && this.intendedToVoteForPGEWriteIn ==null)) {
                let alert = this.alertCtrl.create({
                    title: 'Reason and intention selections are required.',
                    subTitle: 'Please select the reason you could not vote today and specify who you intended to vote for, everything else on this page is optional.',
                    buttons: ['OK']
                });
                alert.present();
            } else {

                // logic for write ins
                if (this.reasonForCouldNotVotePGE=='otherReasonForCouldNotVotePGE'){
                    this.reasonForCouldNotVotePGE = this.otherReasonForCouldNotVotePGE;
                }

                if (this.intendedToVoteForPGE=='writeIn'){
                    this.intendedToVoteForPGE = this.intendedToVoteForPGEWriteIn;
                }

                if (this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary'){
                    this.reasonForCouldNotVotePrimary = this.otherReasonForCouldNotVotePrimary;
                }

                if (this.intendedToVoteForPrimary=='writeIn'){
                    this.intendedToVoteForPrimary = this.intendedToVoteForPrimaryWriteIn;
                }

                if (this.primaryPresVote=='writeIn'){
                    this.primaryPresVote = this.primaryPresVoteWriteIn;
                }

                if (this.firstPresVote=='writeIn'){
                    this.firstPresVote = this.firstPresVoteWriteIn;
                }

                if (this.secondPresVote=='writeIn'){
                    this.secondPresVote = this.secondPresVoteWriteIn;
                }

                if (this.thirdPresVote=='writeIn'){
                    this.thirdPresVote = this.thirdPresVoteWriteIn;
                }


                // fill nonvote obj
                this.newNonVoteRecord = {
                voteRecordKey: this.recordservice.generateNextNonVoteNumber(),
                volunteerKey: this.volunteerservice.getNewVolunteerKey(),
                gePresVoteCouldNotVoteReason: this.reasonForCouldNotVotePGE,
                gePresVoteIntended:  this.intendedToVoteForPGE,
                gePresVoteLevelOfSupport: this.presVoteLOS,
                pPresVoteCouldNotVoteReason: this.reasonForCouldNotVotePrimary,
                pPresVoteIntended: this.intendedToVoteForPrimary,
                pPresVote: this.primaryPresVote,
                pPresVoteCastBy: this.primaryPresVoteCastBy,
                pPresVoteLevelOfSupport: this.primaryPresVoteLOS,
                pPresVotePollingLocation: this.primaryLocation,
                presFirst: this.firstPresVote,
                presSecond: this.secondPresVote,
                presThird: this.thirdPresVote,
                }
                console.log(this.newNonVoteRecord );
                this.recordservice.addNonVoteRecordToList(this.newNonVoteRecord);
                console.log(this.recordservice.getNonVoteList());

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
