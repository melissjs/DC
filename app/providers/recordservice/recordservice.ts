import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';
import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import { AnomalyRecord } from '../../anomalyrecord';
import { AmendmentRecord } from '../../amendmentrecord';
import { AffidavitRecord } from '../../affidavitrecord';
import { DemographicsRecord } from '../../demographicsrecord';
import { VoteRecord } from '../../voterecord';
import { Timesheet } from '../../timesheet';
import { ANOMALYLIST, AMENDMENTLIST, AFFIDAVITLIST, DEMOGRAPHICSLIST, VOTELIST,
	  TIMESHEETLIST } from '../../fakedatama'



@Injectable()
export class Recordservice {
  anomalyRecordList: AnomalyRecord[];
  amendmentRecordList: AmendmentRecord[];
  affidavitRecordList: AffidavitRecord[];
  demographicsRecordList: DemographicsRecord[];
  voteRecordList: VoteRecord[];
  timesheetList: Timesheet[];

  newAnomalyRecord: AnomalyRecord;
  newAmendmentRecord: AmendmentRecord;
  newAffidavitRecord: AffidavitRecord;
  newDemographicsRecord: DemographicsRecord;
  newVoteRecord: VoteRecord;

  newTimesheet: Timesheet;
  currentTimesheet: Timesheet;
  

  pollingstationservice: Pollingstationservice;
  volunteerservice: Volunteerservice;

    // These are assigned automatically by the database
  nextAffidavitNumber: string;
  nextVoteNumber: string;
  nextNonVoteNumber: string;

   afcounter: number;
   vcounter: number;
   nvcounter: number;
   nonVoteRecordBool: boolean;
   primarySuccess: boolean;
   primaryIntention: boolean;

   totalIndividualAnomalyRecords: number;
   totalTeamAnomalyRecords: number;
   totalIndividualAmendmentRecords: number;
   totalTeamAmendmentRecords: number;
   totalIndividualVoteRecords: number;
   totalTeamVoteRecords: number;
   totalIndividualNonVoteRecords: number;
   totalTeamNonVoteRecords: number;
   totalIndividualAffidavitRecords: number;
   totalTeamAffidavitRecords: number;
   totalTeamDemographicsRecords: number;
   totalIndividualDemographicsRecords: number;

   totalTeamRecords: number;
   totalIndividualRecords: number;

  constructor(private http: Http, pollingstationservice: Pollingstationservice, volunteerservice: Volunteerservice) {
  this.anomalyRecordList = ANOMALYLIST;
  this.amendmentRecordList = AMENDMENTLIST;
  this.affidavitRecordList = AFFIDAVITLIST;
  this.demographicsRecordList = DEMOGRAPHICSLIST;
  this.voteRecordList = VOTELIST;
  this.timesheetList = TIMESHEETLIST;
  this.pollingstationservice = pollingstationservice;
  this.volunteerservice = volunteerservice;
  this.afcounter = 0;
  this.vcounter = 0;
  this.nvcounter = 0;
  this.nonVoteRecordBool = false;
  this.currentTimesheet = this.createVoidTimesheet();
  this.totalIndividualAnomalyRecords = 0;
  this.totalTeamAnomalyRecords = 0;
  this.totalIndividualAmendmentRecords = 0;
  this.totalTeamAmendmentRecords = 0;
  this.totalIndividualVoteRecords = 0;
  this.totalTeamVoteRecords = 0;
  this.totalIndividualNonVoteRecords = 0;
  this.totalTeamNonVoteRecords = 0;
  this.totalIndividualAffidavitRecords = 0;
  this.totalTeamAffidavitRecords = 0;
  this.totalTeamDemographicsRecords = 0;
  this.totalIndividualDemographicsRecords = 0;
  this.totalTeamRecords = 0;
  this.totalIndividualRecords = 0;
  this.primarySuccess = false;
  this.primaryIntention = false;
  }



// ANOMALY

getAnomalyList(){
  return this.anomalyRecordList;
};

addAnomalyRecordToList(passedAnomalyRecord){
  this.anomalyRecordList.push(passedAnomalyRecord);
}

createVoidAnomalyRecord(){
this.newAnomalyRecord = {
volunteerKey: null,
nature: null,
fullName: null,
emailAddress: null,
comments: null,
evidence: false,
}
return this.newAnomalyRecord;
}

getTotalIndividualAnomalyRecords(passedVolunteerKey){
  this.totalIndividualAnomalyRecords = 0;
  for (var i=0; i < this.anomalyRecordList.length; i++){
    if(this.anomalyRecordList[i].volunteerKey == passedVolunteerKey){
      this.totalIndividualAnomalyRecords++;
    }   
  }
return this.totalIndividualAnomalyRecords;
}

getTotalTeamAnomalyRecords(passedTeamVolunteerArray){
  this.totalTeamAnomalyRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.anomalyRecordList.length; i++){
          if(this.anomalyRecordList[i].volunteerKey == passedTeamVolunteerArray[m].volunteerKey){
            this.totalTeamAnomalyRecords++;
          }
        } 
  }
return this.totalTeamAnomalyRecords;
}

//AMENDMENT

getAmendmentList(){
  return this.amendmentRecordList;
};

addAmendmentRecordToList(passedAmendmentRecord) {
    this.amendmentRecordList.push(passedAmendmentRecord);
}

createVoidAmendmentRecord(){
this.newAmendmentRecord = {
volunteerKey: null,
incorrectSelection: null,
correctSelection: null,
authenticatedByKey: null,
}
return this.newAmendmentRecord;
}

getTotalIndividualAmendmentRecords(passedVolunteerKey){
  this.totalIndividualAmendmentRecords = 0;
  for (var i=0; i < this.amendmentRecordList.length; i++){
    if(this.amendmentRecordList[i].volunteerKey == passedVolunteerKey){
      this.totalIndividualAmendmentRecords++;
    }   
  }
return this.totalIndividualAmendmentRecords;
}

getTotalTeamAmendmentRecords(passedTeamVolunteerArray){
  this.totalTeamAmendmentRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.amendmentRecordList.length; i++){
          if(this.amendmentRecordList[i].volunteerKey == passedTeamVolunteerArray[m].volunteerKey){
            this.totalTeamAmendmentRecords++;
          }
        } 
  }
return this.totalTeamAmendmentRecords;
}

// AFFIDAVIT

getAffidavitList(){
  return this.affidavitRecordList;
};

 addAffidavitRecordToList(passedAffidavitRecord){
  this.affidavitRecordList.push(passedAffidavitRecord);
}

createVoidAffidavitRecord(){
this.newAffidavitRecord =  {
//affidavitNumber: null,
volunteerKey: null,
fullName: null,
streetAddress: null,
zip: 0,
comments: null,
emailAddress: null,
evidence: false,
}
return this.newAffidavitRecord;
}

// These are assigned automatically by the database
generateNextAffidavitNumber(){
// this.nextAffidavitNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'af' + (++this.afcounter));
// return this.nextAffidavitNumber;
    return null;
}

getTotalIndividualAffidavitRecords(passedVolunteerKey){
  this.totalIndividualAffidavitRecords = 0;
  for (var i=0; i < this.affidavitRecordList.length; i++){
    if(this.affidavitRecordList[i].volunteerKey == passedVolunteerKey){
      this.totalIndividualAffidavitRecords++;
    }   
  }
return this.totalIndividualAffidavitRecords;
}

getTotalTeamAffidavitRecords(passedTeamVolunteerArray){
  this.totalTeamAffidavitRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.affidavitRecordList.length; i++){
          if(this.affidavitRecordList[i].volunteerKey == passedTeamVolunteerArray[m].volunteerKey){
            this.totalTeamAffidavitRecords++;
          }
        } 
  }
return this.totalTeamAffidavitRecords;
}

// DEMOGRAPHICS

getDemographicsList(){
  return this.demographicsRecordList;
};

 addDemographicsRecordToList(passedDemographicsRecord){
  this.demographicsRecordList.push(passedDemographicsRecord);
}

createVoidDemographicsRecord(){
this.newDemographicsRecord = {
voteRecordKey: null,
volunteerKey: null,
sex: null,
age: null,
ethnicity: null,
partyAffiliation: null,
annualIncome: null,
education: null,
maritalStatus: null,
naturalizedCitizen: null,
countryOfOrigin: null,
firstTimeVoter: null,
}
return this.newDemographicsRecord;
}

// These are assigned automatically by the database
generateNextDemographicsNumber(){
    return null;
//if (this.nonVoteRecordBool){
//return this.nextNonVoteNumber;
//} else {
//if (!this.nonVoteRecordBool){
//return this.nextVoteNumber;
//}
//}
}

getTotalIndividualDemographicsRecords(passedVolunteerKey){
  this.totalIndividualDemographicsRecords = 0;
  for (var i=0; i < this.demographicsRecordList.length; i++){
    if(this.demographicsRecordList[i].volunteerKey == passedVolunteerKey){
      this.totalIndividualDemographicsRecords++;
    }   
  }
return this.totalIndividualDemographicsRecords;
}

getTotalTeamDemographicsRecords(passedTeamVolunteerArray){
  this.totalTeamDemographicsRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.demographicsRecordList.length; i++){
          if(this.demographicsRecordList[i].volunteerKey == passedTeamVolunteerArray[m].volunteerKey){
            this.totalTeamDemographicsRecords++;
          }
        } 
  }
return this.totalTeamDemographicsRecords;
}

// VOTE

getVoteList(){
  return this.voteRecordList;
};

 addVoteRecordToList(passedVoteRecord){
  this.voteRecordList.push(passedVoteRecord);
}

createVoidVoteRecord(){
this.newVoteRecord = {
voteRecordKey: null,
volunteerKey: null,
generalSuccess: false,
generalCouldNotVoteReason:  null,
generalCastBy:  null,
primarySuccess: false,
primaryCouldNotVoteReason: null,
primaryCastBy: null,
primaryVotePollingLocation: null,
presFirst: null,
presSecond: null,
presThird: null,
}
return this.newVoteRecord;
}

// These are assigned automatically by the database
generateNextVoteNumber(){
//this.nextVoteNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'v' + (++this.vcounter));
//return this.nextVoteNumber;
    return null;
}


getTotalIndividualVoteRecords(passedVolunteerKey){
  this.totalIndividualVoteRecords = 0;
  for (var i=0; i < this.voteRecordList.length; i++){
    if(this.voteRecordList[i].volunteerKey==passedVolunteerKey && this.voteRecordList[i].generalSuccess==true){
      this.totalIndividualVoteRecords++;
    }   
  }
return this.totalIndividualVoteRecords;
}

getTotalTeamVoteRecords(passedTeamVolunteerArray){
  this.totalTeamVoteRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.voteRecordList.length; i++){
          if(this.voteRecordList[i].volunteerKey==passedTeamVolunteerArray[m].volunteerKey && this.voteRecordList[i].generalSuccess==true){
            this.totalTeamVoteRecords++;
          }
        } 
  }
return this.totalTeamVoteRecords;
}

// nonvote (get voterecords with !successful)

getTotalIndividualNonVoteRecords(passedVolunteerKey){
  this.totalIndividualNonVoteRecords = 0;
  for (var i=0; i < this.voteRecordList.length; i++){
    if(this.voteRecordList[i].volunteerKey==passedVolunteerKey && this.voteRecordList[i].generalSuccess==false){
      this.totalIndividualNonVoteRecords++;
    }   
  }
return this.totalIndividualNonVoteRecords;
}

getTotalTeamNonVoteRecords(passedTeamVolunteerArray){
  this.totalTeamNonVoteRecords = 0;
  for (var m=0; m < passedTeamVolunteerArray.length; m++){
    var member = passedTeamVolunteerArray[m].volunteerKey
        for (var i=0; i < this.voteRecordList.length; i++){
          if(this.voteRecordList[i].volunteerKey==passedTeamVolunteerArray[m].volunteerKey && this.voteRecordList[i].generalSuccess==false){
            this.totalTeamNonVoteRecords++;
          }
        } 
  }
return this.totalTeamNonVoteRecords;
}

// timesheet

setTimesheet(){
}

getTimesheet(){

}

getTimesheetList(){
  return this.timesheetList;
};

 addTimesheetToList(passedTimesheet){
  this.timesheetList.push(passedTimesheet);
}

createVoidTimesheet(){
this.newTimesheet = {
volunteerKey: null,
authenticatingVolunteerKey: null,
checkInTime: null,
checkOuttime: null,
geoLocation: null,
}
return this.newTimesheet;
}

// totals

getTotalTeamRecords(passedTeam){
this.totalTeamRecords = this.getTotalTeamAffidavitRecords(passedTeam) + this.getTotalTeamAnomalyRecords(passedTeam) + this.getTotalTeamAmendmentRecords(passedTeam) + this.getTotalTeamDemographicsRecords(passedTeam) + this.getTotalTeamVoteRecords(passedTeam) + this.getTotalTeamNonVoteRecords(passedTeam);
return this.totalTeamRecords;

}

getTotalIndividualRecords(passedVolunteerKey){
this.totalIndividualRecords = this.getTotalIndividualAffidavitRecords(passedVolunteerKey) + this.getTotalIndividualAnomalyRecords(passedVolunteerKey) + this.getTotalIndividualAmendmentRecords(passedVolunteerKey) + this.getTotalIndividualDemographicsRecords(passedVolunteerKey) + this.getTotalIndividualVoteRecords(passedVolunteerKey) + this.getTotalIndividualNonVoteRecords(passedVolunteerKey);
return this.totalIndividualRecords;
}




// booleans

setPrimarySuccess(passedBool){
  this.primarySuccess = passedBool;
}

getPrimarySuccess(){
  return this.primarySuccess;
}

setPrimaryIntention(passedBool){
  this.primaryIntention = passedBool;
}

getPrimaryIntention(){
  return this.primaryIntention;
}

// NON VOTER VS VOTER SWITCH

getNonVoteBool(){
  return this.nonVoteRecordBool;

}

setToNonVote(passedBool){
 this.nonVoteRecordBool = passedBool;
}


}

