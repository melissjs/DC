import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
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
    otherReasonCouldNotVotePrimary: string;
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
    inFlorida: boolean;
    primaryCongressVoteWriteIn: string;
    primaryCongressVote: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private pollingstationservice: Pollingstationservice, volunteerservice: Volunteerservice, recordservice: Recordservice) {
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
        this.otherReasonCouldNotVotePrimary = null;
        this.intendedToVoteForPrimaryWriteIn = null;
        this.pollingstationservice = pollingstationservice;
        this.primaryCongressVoteWriteIn = null;
        this.primaryCongressVote = null;
        this.inFlorida = this.pollingstationservice.isThisInFlorida()
        
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

        onChangePrimaryCongressVote(value){
        this.primaryCongressVote = value;
   }

        onChangePrimaryCongressVoteWriteIn(passedPrimaryCongressVoteWriteIn){
        this.primaryCongressVoteWriteIn = passedPrimaryCongressVoteWriteIn;

   }

        onChangePrimaryLocation(value){
        this.primaryLocation = value;
   }

        onChangeReasonForCouldNotVotePrimary(value){
        this.reasonForCouldNotVotePrimary = value;
   }

        onChangeOtherReasonForCouldNotVotePrimary(value){
        this.otherReasonCouldNotVotePrimary = value;
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
                        return;
                    }
                    

                        // logic for write ins
                        if (this.reasonForCouldNotVotePGE=='otherReasonForCouldNotVotePGE' && !this.otherReasonForCouldNotVotePGE){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please write in reason for not being able to vote today.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 



                        if (this.intendedToVoteForPGE=='writeIn' && !this.intendedToVoteForPGEWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Intended Presidential Vote.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 



                        if (this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary' && !this.otherReasonCouldNotVotePrimary){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please write in reason for not being able to vote in the primary.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 



                        if (this.intendedToVoteForPrimary=='writeIn' && !this.intendedToVoteForPrimaryWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Intended Primary Presidential Vote.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 


                        if(this.primaryPresVote == 'writeIn' && !this.primaryPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Primary Presidential Vote.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 


                        if(this.primaryCongressVote == 'writeIn' && !this.primaryCongressVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Primary Congressional Vote.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 



                        if (this.firstPresVote=='writeInF' && !this.firstPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in First Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        } 


                        if (this.secondPresVote=='writeInS' && !this.secondPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Second Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        }



                        if (this.thirdPresVote=='writeInT' && !this.thirdPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Third Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        }
                        
                        
                        // fix timing
                        if (this.reasonForCouldNotVotePGE=='otherReasonForCouldNotVotePGE' && this.otherReasonForCouldNotVotePGE) {
                            this.reasonForCouldNotVotePGE = this.otherReasonForCouldNotVotePGE;
                        }

                        if (this.intendedToVoteForPGE=='writeIn' && this.intendedToVoteForPGEWriteIn) {
                            this.intendedToVoteForPGE = this.intendedToVoteForPGEWriteIn;
                        }

                        if (this.primaryPresVote!=="couldNotVote") {
                            this.reasonForCouldNotVotePrimary = null;
                        }

                        if (this.primaryPresVote=="couldNotVote" && this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary' && this.otherReasonCouldNotVotePrimary){
                            this.reasonForCouldNotVotePrimary = this.otherReasonCouldNotVotePrimary;
                        }

                        if (this.intendedToVoteForPrimary=='writeIn' && this.intendedToVoteForPrimaryWriteIn){
                            this.intendedToVoteForPrimary = this.intendedToVoteForPrimaryWriteIn;
                        }

                        if (this.primaryPresVote == 'writeIn' && this.primaryPresVoteWriteIn){
                            this.primaryPresVote = this.primaryPresVoteWriteIn;
                        }

                        if (this.primaryCongressVote == 'writeIn' && this.primaryCongressVoteWriteIn){
                            this.primaryCongressVote = this.primaryCongressVoteWriteIn;
                        }

                         if (this.firstPresVote=='writeInF' && !this.firstPresVoteWriteIn){
                        this.firstPresVote = this.firstPresVoteWriteIn;
                         }

                         if (this.secondPresVote=='writeInS' && !this.secondPresVoteWriteIn){
                        this.secondPresVote = this.secondPresVoteWriteIn;
                         }

                         if (this.thirdPresVote=='writeInT' && this.thirdPresVoteWriteIn){
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
                        pCongressVote: this.primaryCongressVote,
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
