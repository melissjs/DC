import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {Ovrservice} from '../../providers/ovrservice/ovrservice';
import {OvrComponent} from '../../components/ovr-component/ovr-component';
import {VoteRecord} from '../../voterecord';
import {OfficeVoteRecord} from '../../officevoterecord';
import {Volunteer} from '../../volunteer';
import {PRIMARYPRES} from '../../candidatelists/ppreslist';
import {PRIMARYCONGRESS} from '../../candidatelists/pcongresslist';
import {PRESIDENT} from '../../candidatelists/preslist';



@Component({
  templateUrl: 'build/pages/vote/vote.html',
  directives: [OvrComponent],
})
export class VotePage {
    generalCastBy: string;
    primaryLocation: string;
    primaryCastBy: string;

    firstPresVote: string;
    secondPresVote: string;
    thirdPresVote: string;
    newVoteRecord: VoteRecord;
    gePresOfficeVoteRecord: OfficeVoteRecord;
    pPresOfficeVoteRecord: OfficeVoteRecord;
    pCongOfficeVoteRecord: OfficeVoteRecord;
    firstPresVoteWriteIn: string;
    secondPresVoteWriteIn: string;
    thirdPresVoteWriteIn: string;

    reasonForCouldNotVoteGeneral: string;
    otherReasonForCouldNotVoteGeneral: string;
    reasonForCouldNotVotePrimary: string;
    otherReasonForCouldNotVotePrimary: string;
    
    //volunteerservice: Volunteerservice;
    //recordservice: Recordservice;
    //pollingstationservice: Pollingstationservice;

    inFlorida: boolean;
    PRESIDENT: any;
    PRIMARYCONGRESS: any;
    PRIMARYPRES: any;
    //currentVolunteer: Volunteer;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private pollingstationservice: Pollingstationservice, private volunteerservice: Volunteerservice, private recordservice: Recordservice, private ovrservice: Ovrservice) {
        this.PRESIDENT = PRESIDENT;
        this.PRIMARYCONGRESS = PRIMARYCONGRESS;
        this.PRIMARYPRES = PRIMARYPRES;
        this.navCtrl = navCtrl;
        this.generalCastBy = null;
        this.primaryCastBy = null;
        this.primaryLocation = null;
        this.firstPresVote = null;
        this.secondPresVote = null;
        this.thirdPresVote = null;
        this.reasonForCouldNotVotePrimary = null;
        this.volunteerservice = volunteerservice;
        this.recordservice = recordservice;
        this.newVoteRecord = this.recordservice.createVoidVoteRecord();
        this.firstPresVoteWriteIn = null;
        this.secondPresVoteWriteIn = null;
        this.thirdPresVoteWriteIn = null;
        this.pollingstationservice = pollingstationservice;
        this.ovrservice = ovrservice;
        //this.currentVolunteer = this.volunteerservice.getNewVolunteer();
        this.inFlorida = this.pollingstationservice.isThisInState('FL');
        console.log(this.inFlorida);
        console.log(this.pollingstationservice.selectedStationXX.state);
       
    }

  // General

       onChangeGeneralCastBy(value){
        this.generalCastBy = value;
   }

 

   // Primary

        onChangePrimarySuccess(primarySuccess){
        if (primarySuccess=='didVote'){
            this.recordservice.setPrimarySuccess(true);
        } else if(primarySuccess=='couldNotVote'){
            this.recordservice.setPrimaryIntention(true);
            this.recordservice.setPrimarySuccess(false);
        } else if(primarySuccess=='didNotVote'){
            this.recordservice.setPrimarySuccess(false);
        }
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

       onChangePrimaryCastBy(value){
        this.primaryCastBy = value;
     }

   // Ranking

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
            if (this.generalCastBy == null) {
                let alert = this.alertCtrl.create({
                    title: 'Cast by selection is required.',
                    subTitle: 'Please select the candidate you voted for today and specify how you cast your vote, everything else on this page is optional.',
                    buttons: ['OK']
                });
                alert.present();
            } else {

            // logic for write ins
            

             if (this.reasonForCouldNotVotePrimary=='otherReasonForCouldNotVotePrimary' && !this.otherReasonForCouldNotVotePrimary){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please write in reason for not being able to vote in the primary.',
                            buttons: ['OK']
                            });
                            alert.present();
                            return;
                        } 



                      

                   


                        if (this.firstPresVote=='writeIn' && !this.firstPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in First Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        } 


                        if (this.secondPresVote=='writeIn' && !this.secondPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Second Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        }



                        if (this.thirdPresVote=='writeIn' && !this.thirdPresVoteWriteIn){
                            let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Third Choice Presidential Vote.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
                        }


                        // put in

                         if (this.firstPresVote=='writeIn' && !this.firstPresVoteWriteIn){
                        this.firstPresVote = this.firstPresVoteWriteIn;
                         }

                         if (this.secondPresVote=='writeIn' && !this.secondPresVoteWriteIn){
                        this.secondPresVote = this.secondPresVoteWriteIn;
                         }

                         if (this.thirdPresVote=='writeIn' && this.thirdPresVoteWriteIn){
                        this.thirdPresVote = this.thirdPresVoteWriteIn;
                         }



            // fill object
            this.newVoteRecord = {
                voteRecordKey: null,
                volunteerKey: this.volunteerservice.getNewVolunteerKey(),
                generalSuccess: !this.recordservice.getNonVoteBool(),
                generalCouldNotVoteReason:  null,
                generalCastBy:  this.generalCastBy,
                primarySuccess: this.recordservice.getPrimarySuccess(),
                primaryCouldNotVoteReason: this.reasonForCouldNotVotePrimary,
                primaryCastBy: this.primaryCastBy,
                primaryVotePollingLocation: this.primaryLocation, 
                presFirst: this.firstPresVote,
                presSecond: this.secondPresVote,
                presThird: this.thirdPresVote,
            }

            console.log(this.newVoteRecord );
            this.recordservice.addVoteRecordToList(this.newVoteRecord);
            console.log(this.recordservice.getVoteList());
                that.navCtrl.setRoot(DemographicsPage, {
                });

            // fill ovr record
            this.gePresOfficeVoteRecord = this.ovrservice.getVoidOfficeVoteRecord();

                this.gePresOfficeVoteRecord = {
                voteRecordKey: null,
                office: "President",
                election: "General",
                success: !this.recordservice.getNonVoteBool(),
                candidate: this.ovrservice.getgePres(),
                levelOfSupport: this.ovrservice.getgePresLos(),
                }
                console.log(this.gePresOfficeVoteRecord);
                console.log("hey" + this.gePresOfficeVoteRecord);
                




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
