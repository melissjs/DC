import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

import {Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';

import { AnomalyRecord } from '../../anomalyrecord';
import { AmendmentRecord } from '../../amendmentrecord';
import { AffidavitRecord } from '../../affidavitrecord';
import { DemographicsRecord } from '../../demographicsrecord';
import { VoteRecord } from '../../voterecord';
import { NonvoteRecord } from '../../nonvoterecord';

import { ANOMALYLIST } from '../../anomalylist';
import { AMENDMENTLIST } from '../../amendmentlist';
import { AFFIDAVITLIST } from '../../affidavitlist';
import { DEMOGRAPHICSLIST } from '../../demographicslist';
import { VOTELIST } from '../../votelist';
import { NONVOTELIST } from '../../nonvotelist'



/*
  Generated class for the Recordservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Recordservice {
  anomalyRecordList: AnomalyRecord[];
  amendmentRecordList: AmendmentRecord[];
  affidavitRecordList: AffidavitRecord[];
  demographicsRecordList: DemographicsRecord[];
  voteRecordList: VoteRecord[];
  nonVoteRecordList: NonvoteRecord[];

  newAnomalyRecord: AnomalyRecord;
  newAmendmentRecord: AmendmentRecord;
  newAffidavitRecord: AffidavitRecord;
  newDemographicsRecord: DemographicsRecord;
  newVoteRecord: VoteRecord;
  newNonVoteRecord: NonvoteRecord;

  pollingstationservice: Pollingstationservice;
  volunteerservice: Volunteerservice;

  nextAffidavitNumber: string;
  nextVoteNumber: string;
  nextNonVoteNumber: string;

   afcounter: number;
   vcounter: number;
   nvcounter: number;
   nonVoteRecordBool: boolean;

  constructor(private http: Http, pollingstationservice: Pollingstationservice, volunteerservice: Volunteerservice) {
  this.anomalyRecordList = ANOMALYLIST;
  this.amendmentRecordList = AMENDMENTLIST;
  this.affidavitRecordList = AFFIDAVITLIST;
  this.demographicsRecordList = DEMOGRAPHICSLIST;
  this.voteRecordList = VOTELIST;
  this.nonVoteRecordList = NONVOTELIST;
  this.pollingstationservice = pollingstationservice;
  this.volunteerservice = volunteerservice;
  this.afcounter = 0;
  this.vcounter = 0;
  this.nvcounter = 0;
  this.nonVoteRecordBool = false;

  }

// NON VOTER VS VOTER SWITCH

getNonVoteBool(){
  return this.nonVoteRecordBool;

}

setToNonVote(passedBool){
 this.nonVoteRecordBool = passedBool;
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

//AMENDMENT

getAmendmentList(){
  return this.amendmentRecordList;
};

addAmendmentRecordToList(passedAmendmentRecord){
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

generateNextAffidavitNumber(){
this.nextAffidavitNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'af' + (++this.afcounter));
return this.nextAffidavitNumber;
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

generateNextDemographicsNumber(){
if (this.nonVoteRecordBool){
return this.nextNonVoteNumber;
} else {
if (!this.nonVoteRecordBool){
return this.nextVoteNumber;
}
}
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
gePresVote: null,
gePresVoteCastBy: null,
gePresVoteLevelOfSupport: null,
pPresVoteCouldNotVote: null,
pPresVoteCouldNotVoteReason: null,
pPresVoteIntended: null,
pPresVote: null,
pPresVoteCastBy: null,
pPresVoteLevelOfSupport: null,
pPresVotePollingLocation: null,
presFirst: null,
presSecond: null,
presThird: null,
}
return this.newVoteRecord;
}

generateNextVoteNumber(){
this.nextVoteNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'v' + (++this.vcounter));
return this.nextVoteNumber;
}

// NON VOTE

getNonVoteList(){
  return this.nonVoteRecordList;
};

 addNonVoteRecordToList(passedNonVoteRecord){
  this.nonVoteRecordList.push(passedNonVoteRecord);
}

createVoidNonVoteRecord(){
this.newNonVoteRecord = {
voteRecordKey: null,
volunteerKey: null,
gePresVoteCouldNotVoteReason: null,
gePresVoteIntended: null,
gePresVoteLevelOfSupport: null,
pPresVoteCouldNotVoteReason: null,
pPresVoteIntended: null,
pPresVote: null,
pPresVoteCastBy: null,
pPresVoteLevelOfSupport: null,
pPresVotePollingLocation: null,
presFirst: null,
presSecond: null,
presThird: null,
}
return this.newVoteRecord;
}

generateNextNonVoteNumber(){
this.nextNonVoteNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'nv' + (++this.nvcounter));
return this.nextNonVoteNumber;
}

}

