import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {DemographicsRecord} from '../../demographicsrecord';



@Component({
  templateUrl: 'build/pages/demographics/demographics.html',
})
export class DemographicsPage {
enterSex: string;
enterAge: string;
enterEthnicity: string;
enterParty: string;
enterPartyWriteIn: string;
enterIncome: string;
enterEducation: string;
enterMaritalStatus: string;
enterNaturalizedCitizen: boolean;
enterCountryOfOrigin: string;
enterFirstTimeVoter: boolean;
newDemographicsRecord: DemographicsRecord;
recordservice: Recordservice;
volunteerservice: Volunteerservice;

  constructor(private navCtrl: NavController, recordservice: Recordservice, volunteerservice: Volunteerservice) {
  this.navCtrl = navCtrl;
  this.enterSex = null;
  this.enterAge = null;
  this.enterIncome = null;
  this.enterParty = null;
  this.enterPartyWriteIn = null;
  this.enterEducation = null;
  this.enterMaritalStatus = null;
  this.enterEthnicity = null;
  this.enterFirstTimeVoter = null;
  this.enterNaturalizedCitizen = null;
  this.enterCountryOfOrigin = null;
  this.volunteerservice = volunteerservice;
  this.recordservice = recordservice;
  this.newDemographicsRecord = this.recordservice.createVoidDemographicsRecord();
  }

        onChangeSex(value){
        this.enterSex = value;
   }

        onChangeAge(value){
        this.enterAge = value;
   }

        onChangeEthnicity(value){
        this.enterEthnicity = value;
   }

        onChangeParty(value){
        this.enterParty = value;
   }

        onChangePartyWriteIn(value){
        this.enterPartyWriteIn = value;
   }

        onChangeIncome(value){
        this.enterIncome = value;
   }

        onChangeEducation(value){
        this.enterEducation = value;
   }     

        onChangeMaritalStatus(value){
        this.enterMaritalStatus = value;
   } 

        onChangeNaturalizedCitizen(value){
        this.enterNaturalizedCitizen = value;
   }   

        onChangeNaturalizedCitizenWriteIn(value){
        this.enterCountryOfOrigin = value;
   }

        onChangeFirstTimeVoter(value){
        this.enterFirstTimeVoter = value;
   }




    onSubmit() {
        var that = this;
        try {

            // logic for write in
            if (this.enterParty=='Other Party'){
                this.enterParty = this.enterPartyWriteIn;
            }

            // fill demographics obj
            this.newDemographicsRecord = {
            voteRecordKey: this.recordservice.generateNextDemographicsNumber(),
            volunteerKey: this.volunteerservice.getNewVolunteerKey(),
            sex: this.enterSex,
            age: this.enterAge,
            ethnicity: this.enterEthnicity,
            partyAffiliation: this.enterParty,
            annualIncome: this.enterIncome,
            education: this.enterEducation ,
            maritalStatus: this.enterMaritalStatus,
            naturalizedCitizen: this.enterNaturalizedCitizen,
            countryOfOrigin: this.enterCountryOfOrigin,
            firstTimeVoter: this.enterFirstTimeVoter,
            }
            console.log(this.newDemographicsRecord);
            this.recordservice.addDemographicsRecordToList(this.newDemographicsRecord);
                console.log(this.recordservice.getDemographicsList());



            that.navCtrl.setRoot(VoterecordPage, {
            });

        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }



}
