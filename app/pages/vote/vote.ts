import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {RestService} from '../../providers/rest-service/rest-service';
import {Ovrservice} from '../../providers/ovrservice/ovrservice';
import {OvrComponent} from '../../components/ovr-component/ovr-component';
import {VoteRecord} from '../../voterecord';
import {OfficeVoteRecord} from '../../officevoterecord';
import {Volunteer} from '../../volunteer';
import {ElectOfficeGUI} from '../../electofficegui';
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
    PRESIDENT: ElectOfficeGUI;
    PRIMARYCONGRESS: ElectOfficeGUI;
    PRIMARYPRES: ElectOfficeGUI;
    //currentVolunteer: Volunteer;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController,
                private pollingstationservice: Pollingstationservice,
                private volunteerservice: Volunteerservice,
                private recordservice: Recordservice, private ovrservice: Ovrservice,
                private restSvc: RestService) {
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
       
        this.restSvc.getObjectsByField('elect-offices','electOfficeKey','President2016'
                                       ,this.successElectOfficePresCb, this.failureElectOfficePresCb, this);
        this.restSvc.getObjectsByField('candidates','electOfficeKey','President2016'
                                       ,this.successCandsPresCb, this.failureCandsPresCb, this);

        this.restSvc.getObjectsByField('elect-offices','electOfficeKey','PrimaryPresident2016'
                                       ,this.successElectOfficePrimPresCb, this.failureElectOfficePrimPresCb, this);
        this.restSvc.getObjectsByField('candidates','electOfficeKey','PrimaryPresident2016'
                                       ,this.successCandsPrimPresCb, this.failureCandsPrimPresCb, this);


        this.restSvc.getObjectsByField('elect-offices','electOfficeKey','Congress Primary 2016'
                                       ,this.successElectOfficePrimCongCb, this.failureElectOfficePrimCongCb, this);
        this.restSvc.getObjectsByField('candidates','electOfficeKey','Congress Primary 2016'
                                       ,this.successCandsPrimCongCb, this.failureCandsPrimCongCb, this);

    }

    successElectOfficePresCb(that, real, data) {
        if (real) {
            that.PRESIDENT.inner = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureElectOfficePresCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
    }

    successElectOfficePrimPresCb(that, real, data) {
        if (real) {
            that.PRIMARYPRES.inner = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureElectOfficePrimPresCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
    }

    successElectOfficePrimCongCb(that, real, data) {
        if (real) {
            that.PRIMARYCONGRESS.inner = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureElectOfficePrimCongCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
    }

    successCandsPresCb(that, real, data) {
        if (real) {
            that.PRESIDENT.candidates = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureCandsPresCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
    }

    successCandsPrimPresCb(that, real, data) {
        if (real) {
            that.PRIMARYPRES.candidates = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureCandsPrimPresCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
    }

    successCandsPrimCongCb(that, real, data) {
        if (real) {
            that.PRIMARYCONGRESS.candidates = data;
        } else {
            // If fake.. just keep using the fake data...
        }
    }

    failureCandsPrimCongCb(that, errStr) {
        // Error retrieving the candidates data from the database.. (keep using fake data?)
        console.log('Error seen in callback ' + errStr);
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

//var boolhere = this.ovrservice.checkFields();
//console.log(boolhere);
    if(this.ovrservice.checkFields()){
    console.log(this.ovrservice.checkFields());
    return;
    }
   // this.ovrservice.checkFields();
    this.ovrservice.fillRecord();



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
