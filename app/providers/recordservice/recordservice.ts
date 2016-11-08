import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AffidavitRecord } from '../../affidavitrecord';
import { AmendmentRecord } from '../../amendmentrecord';
import { AnomalyRecord } from '../../anomalyrecord';
import { DemographicsRecord } from '../../demographicsrecord';
import { ElectOfficeGUI } from '../../electofficegui';
import { OfficeVoteRecord } from '../../officevoterecord';
import { PollingStation } from '../../pollingstation';
import { Timesheet } from '../../timesheet';
import { Volunteer} from '../../volunteer';
import { VoteRecord } from '../../voterecord';

import { Pollingstationservice} from '../../providers/pollingstationservice/pollingstationservice';
import { RestService} from '../../providers/rest-service/rest-service';
import { Volunteerservice} from '../../providers/volunteerservice/volunteerservice';

// import { ANOMALYLIST, AMENDMENTLIST, AFFIDAVITLIST, DEMOGRAPHICSLIST, VOTELIST,
//          TIMESHEETLIST } from '../../fakedatama'

@Injectable()
export class Recordservice {
  anomalyRecordList: AnomalyRecord[];
  amendmentRecordList: AmendmentRecord[];
  affidavitRecordList: AffidavitRecord[];
  demographicsRecordList: DemographicsRecord[];
  voteRecordList: VoteRecord[];
  timesheetList: Timesheet[];

  currentTimesheet: Timesheet;

  pollingstationservice: Pollingstationservice;
  volunteerservice: Volunteerservice;
    authenticatingVolunteerKey: string;

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
   totalIndividualAmendmentRecords: number;
   totalIndividualVoteRecords: number;
   totalIndividualNonVoteRecords: number;
   totalIndividualAffidavitRecords: number;
   totalIndividualDemographicsRecords: number;

    /*
   totalTeamAnomalyRecords: number;
   totalTeamAmendmentRecords: number;
   totalTeamVoteRecords: number;
   totalTeamNonVoteRecords: number;
   totalTeamAffidavitRecords: number;
   totalTeamDemographicsRecords: number;
   totalTeamRecords: number;
   */
   totalIndividualRecords: number;

    // BEGIN: Originally from Ovrservice
    electOffice: ElectOfficeGUI;
    ovrlist: OfficeVoteRecord[];
    inilist: OfficeVoteRecord[];
    mandatoryList: boolean[];
    lastWarning: number;
    MIN_SAVE_WAIT_TIME: number = 60000; // 1 minute
    // END: Originally from Ovrservice

  constructor(private http: Http, pollingstationservice: Pollingstationservice, 
              volunteerservice: Volunteerservice, private alertCtrl: AlertController,
              private restSvc: RestService) {
      this.anomalyRecordList = null; // ANOMALYLIST;
      this.amendmentRecordList = null;// AMENDMENTLIST;
      this.affidavitRecordList = null; // AFFIDAVITLIST;
      this.demographicsRecordList = null; // DEMOGRAPHICSLIST;
      this.voteRecordList = null; // VOTELIST;
      this.timesheetList = null; //TIMESHEETLIST;
      this.pollingstationservice = pollingstationservice;
      this.volunteerservice = volunteerservice;
      this.afcounter = 0;
      this.vcounter = 0;
      this.nvcounter = 0;
      this.nonVoteRecordBool = false;  // change to false after testing
      this.currentTimesheet = this.createVoidTimesheet();
      this.totalIndividualAnomalyRecords = 0;
      this.totalIndividualAmendmentRecords = 0;
      this.totalIndividualAffidavitRecords = 0;
      this.totalIndividualDemographicsRecords = 0;
      this.totalIndividualVoteRecords = 0;
      this.totalIndividualNonVoteRecords = 0;
      /* commenting out team stuff for time... 
      this.totalTeamAnomalyRecords = 0;
      this.totalTeamAmendmentRecords = 0;
      this.totalTeamVoteRecords = 0;
      this.totalTeamNonVoteRecords = 0;
      this.totalTeamAffidavitRecords = 0;
      this.totalTeamDemographicsRecords = 0;
      this.totalTeamRecords = 0;
      */
      this.primarySuccess = null;
      this.primaryIntention = false;
      this.authenticatingVolunteerKey = null;

      // From Ovrservice
      this.ovrlist = null; // OVRLIST;
      this.inilist = null;
      this.lastWarning = 0;

  }

    // ANOMALY

    getAnomalyList(){
        if (this.anomalyRecordList == null) {
            this.anomalyRecordList = new Array();
        }
        return this.anomalyRecordList;
    };

    addAnomalyRecordToList(passedAnomalyRecord){
        this.getAnomalyList().push(passedAnomalyRecord);
        this.totalIndividualAnomalyRecords++;
    }

    createVoidAnomalyRecord(){
        var newAnomalyRecord = {
            volunteerKey: null,
            nature: null,
            fullName: null,
            emailAddress: null,
            comments: null,
            evidence: false,
        }
        return newAnomalyRecord;
    }

    getTotalIndividualAnomalyRecords( /* passedVolunteerKey */) {
        // this.totalIndividualAnomalyRecords = 0;
        /* 
           for (var i=0; i < this.anomalyRecordList.length; i++){
           if(this.anomalyRecordList[i].volunteerKey == passedVolunteerKey){
           this.totalIndividualAnomalyRecords++;
           }   
           }
        */
        return this.totalIndividualAnomalyRecords;
    }

    //AMENDMENT

    getAmendmentList(){
        if (this.amendmentRecordList == null) {
            this.amendmentRecordList = new Array();
        }
        return this.amendmentRecordList;
    };

    addAmendmentRecordToList(passedAmendmentRecord) {
        this.getAmendmentList().push(passedAmendmentRecord);
        this.totalIndividualAmendmentRecords++
        this.attemptToSendToDatabase();
    }

    createVoidAmendmentRecord(){
        var newAmendmentRecord = {
            volunteerKey: null,
            voteRecordKey: null,
            incorrectSelection: null,
            correctSelection: null,
            authenticatedByKey: null,
        }
        return newAmendmentRecord;
    }

    getTotalIndividualAmendmentRecords( /* passedVolunteerKey */){
        return this.totalIndividualAmendmentRecords;
    }

    // AFFIDAVIT

    getAffidavitList(){
        if (this.affidavitRecordList == null) {
            this.affidavitRecordList = new Array();
        }
        return this.affidavitRecordList;
    };

    addAffidavitRecordToList(passedAffidavitRecord){
        this.getAffidavitList().push(passedAffidavitRecord);
        this.totalIndividualAffidavitRecords++;
        this.attemptToSendToDatabase();
    }

    createVoidAffidavitRecord(){
        var newAffidavitRecord =  {
            //affidavitNumber: null,
            volunteerKey: null,
            fullName: null,
            streetAddress: null,
            zip: 0,
            comments: null,
            emailAddress: null,
            evidence: false,

        }
        return newAffidavitRecord;
    }

    // These are assigned automatically by the database
    generateNextAffidavitNumber(){
        // this.nextAffidavitNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'af' + (++this.afcounter));
        // return this.nextAffidavitNumber;
        return null;
    }

    getTotalIndividualAffidavitRecords( /* passedVolunteerKey */ ){
        return this.totalIndividualAffidavitRecords;
    }

    // DEMOGRAPHICS

    getDemographicsList(){
        if (this.demographicsRecordList == null) {
            this.demographicsRecordList = new Array();
        }
        return this.demographicsRecordList;
    };

    addDemographicsRecordToList(passedDemographicsRecord){
        this.getDemographicsList().push(passedDemographicsRecord);
        this.totalIndividualDemographicsRecords++;
        this.attemptToSendToDatabase();
    }

    createVoidDemographicsRecord(){
        var newDemographicsRecord = {
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
        return newDemographicsRecord;
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

    getTotalIndividualDemographicsRecords( /* passedVolunteerKey */){
        return this.totalIndividualDemographicsRecords;
    }

    // VOTE

    getVoteList(){
        if (this.voteRecordList == null) {
            this.voteRecordList = new Array();
        }
        return this.voteRecordList;
    }

    addVoteRecordToList(passedVoteRecord){
        this.getVoteList().push(passedVoteRecord);
        if (passedVoteRecord.generalSuccess == true) {
            this.totalIndividualVoteRecords++;
        } else {
            this.totalIndividualNonVoteRecords++;
        }
        this.attemptToSendToDatabase();
    }

    createVoidVoteRecord(){
        var newVoteRecord = {
            voteRecordKey: null,
            volunteerKey: null,
            generalSuccess: false,
            generalCouldNotVoteReason:  null,
            generalCastBy:  null,
            primarySuccess: null,
            primaryCouldNotVoteReason: null,
            primaryCastBy: null,
            primaryVotePollingLocation: null,
            presFirst: null,
            presSecond: null,
            presThird: null,
        }
        return newVoteRecord;
    }

    // These are assigned automatically by the database
    generateNextVoteNumberXX(){
        //this.nextVoteNumber = (this.volunteerservice.getNewVolunteerKey() + this.pollingstationservice.getStationKey() + 'v' + (++this.vcounter));
        //return this.nextVoteNumber;
        return null;
    }

    generateVoteRecordKey(){
        this.nextVoteNumber = (this.volunteerservice.getNewVolunteerKey() + '-' + (++this.vcounter));
        //return this.nextVoteNumber;
        return null;
    }

    getVoteRecordKey(){
        return this.nextVoteNumber;
    }

    getTotalIndividualVoteRecords(/* passedVolunteerKey */){
        return this.totalIndividualVoteRecords;
    }

    // nonvote (get voterecords with !successful)

    getTotalIndividualNonVoteRecords(/* passedVolunteerKey */){
        return this.totalIndividualNonVoteRecords;
    }

    // timesheet

    setTimesheet(){
    }

    getTimesheet(){
    }

    getTimesheetList(){
        if (this.timesheetList == null) {
            this.timesheetList = new Array();
        }
        return this.timesheetList;
    };

    addTimesheetToList(passedTimesheet){
        this.getTimesheetList().push(passedTimesheet);
        this.authenticatingVolunteerKey = passedTimesheet.authenticatingVolunteerKey;
        this.attemptToSendToDatabase();
    }

    getAuthenticatingVolunteerKey() {
        return this.authenticatingVolunteerKey;
    }

    createVoidTimesheet(){
        var newTimesheet = {
            volunteerKey: null,
            authenticatingVolunteerKey: null,
            checkInTime: null,
            checkOuttime: null,
            geoLocation: null,
        }
        return newTimesheet;
    }

    // totals

    getTotalIndividualRecords( /* passedVolunteerKey */ ){
        var totalIndividualRecords = this.getTotalIndividualAffidavitRecords( /* passedVolunteerKey */) + 
            this.getTotalIndividualAnomalyRecords(/* passedVolunteerKey */) + 
            this.getTotalIndividualAmendmentRecords(/* passedVolunteerKey */) + 
            this.getTotalIndividualDemographicsRecords(/* passedVolunteerKey */) +
            this.getTotalIndividualVoteRecords(/* passedVolunteerKey */) + 
            this.getTotalIndividualNonVoteRecords(/* passedVolunteerKey */);
        return totalIndividualRecords;
    }


    /* commenting out team information, due to constraint of time.. may revisit this... 
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

       getTotalTeamRecords(passedTeam){
       this.totalTeamRecords = this.getTotalTeamAffidavitRecords(passedTeam) + this.getTotalTeamAnomalyRecords(passedTeam) + this.getTotalTeamAmendmentRecords(passedTeam) + this.getTotalTeamDemographicsRecords(passedTeam) + this.getTotalTeamVoteRecords(passedTeam) + this.getTotalTeamNonVoteRecords(passedTeam);
       return this.totalTeamRecords;

       }

    */

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

    // BEGIN: FROM Ovrservice
    checkFieldsForErrors(mandatory_exists: boolean, minimum_msg: string){
        // alert if gePres not filled
        var retmsg = null;
        if (this.inilist != null) {
            var ii;
            for (ii=0;ii<this.inilist.length;ii++) {
                var ofr = this.inilist[ii];
                if ((this.mandatoryList[ii]) && (!ofr.candidate)) {
                    if (retmsg == null) {
                        retmsg = '';
                    } else {
                        retmsg = retmsg + ', and ';
                    }
                    retmsg = retmsg + ofr.electOfficeKey +  ' vote required.';
                }
                if (ofr.candidate == '26') {
                    /*  if (retmsg == null) {
                        retmsg = '';
                        } else {
                        retmsg = retmsg + ', and ';
                        }
                        retmsg = retmsg + ofr.electOfficeKey + 
                        ' (when selecting other please write in candidate name)'
                    */
                    retmsg = 'When selecting "Other" please write in candidate name.'
                }
            }
        } else if (mandatory_exists) {
            retmsg = minimum_msg;
        }
        return retmsg;
    }

    setOVRRecord(passedRecord){
        var ii;
        var found = false
        if (this.inilist != null) {
            var ii;
            for (ii=0;ii<this.inilist.length;ii++) {
                var ofr = this.inilist[ii];
                if (ofr.electOfficeKey == passedRecord.electOfficeKey) {
                    this.inilist[ii] = passedRecord;
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            // Error here... report it.
            console.log('ERROR in ovrservice.. did not find office record for passed in update');
        }
    }


    addOVRToList(ofr) {
        if (this.ovrlist == null) {
            this.ovrlist = new Array();
        }
        this.ovrlist.push(ofr);
        console.log(this.ovrlist);
    }


    addEligibleOVRRecordsToList() {
        if (this.inilist != null) {
            var ii;
            var voteRecordKey = this.getVoteRecordKey();
            for (ii=0;ii<this.inilist.length;ii++) {
                var ofr = this.inilist[ii];
                if( (ofr.electOfficeKey.includes("General")) && (this.getNonVoteBool())) {
                    // switch to false..
                    ofr.success = false;
                }
                if( (ofr.electOfficeKey.includes("Primary")) && (!this.getPrimarySuccess())) {
                    // switch to false..
                    ofr.success = false;
                }
                if (ofr.success || ofr.candidate || ofr.levelOfSupport) {
                    ofr.voteRecordKey = voteRecordKey;
                    this.addOVRToList(ofr); 
                }
            }
            // since we added them.. remove from inilist
            this.inilist = null;
            this.attemptToSendToDatabase();
        }
    }

    needsFlushArray(arr) {
        return ((arr != null) && (arr.length > 0));
    }


    needsFlush() {
        return this.needsFlushArray(this.ovrlist)
            || this.needsFlushArray(this.demographicsRecordList)
            || this.needsFlushArray(this.voteRecordList)
            || this.needsFlushArray(this.amendmentRecordList)
            || this.needsFlushArray(this.affidavitRecordList)
            || this.needsFlushArray(this.timesheetList)
            || this.needsFlushArray(this.voteRecordList);
    }

    attemptToSendToDatabase() {
        if (this.needsFlushArray(this.ovrlist)) {
            var ofr = this.ovrlist[0];
            this.restSvc.saveObject('office-vote-records',ofr,true,
                                    this.successCb, this.failureCb, this);
        }
        if (this.needsFlushArray(this.demographicsRecordList)) {
            var dr = this.demographicsRecordList[0];
            this.restSvc.saveObject('demographics-records',dr,true,
                                    this.successDrCb, this.failureCb, this);
        }
        if (this.needsFlushArray(this.voteRecordList)) {
            var vr = this.voteRecordList[0];
            this.restSvc.saveObject('vote-records',vr,true,
                                    this.successVrCb, this.failureCb, this);
        }
        if (this.needsFlushArray(this.amendmentRecordList)) {
            var amr = this.amendmentRecordList[0];
            this.restSvc.saveObject('amendment-records',amr,true,
                                    this.successAmrCb, this.failureCb, this);
        }
        if (this.needsFlushArray(this.affidavitRecordList)) {
            var afr = this.amendmentRecordList[0];
            this.restSvc.saveObject('affidavit-records',afr,true,
                                    this.successAfrCb, this.failureCb, this);
        }
        if (this.needsFlushArray(this.timesheetList)) {
            var ats = this.timesheetList[0];
            this.restSvc.saveObject('timesheets',ats,true,
                                    this.successAtsCb, this.failureCb, this);
        }
    }

    successCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.ovrlist.shift();
        that.attemptToSendToDatabase();
    }

    successDrCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.demographicsRecordList.shift();
        that.attemptToSendToDatabase();
    }

    successVrCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.voteRecordList.shift();
        that.attemptToSendToDatabase();
    }

    successAmrCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.amendmentRecordList.shift();
        that.attemptToSendToDatabase();
    }

    successAfrCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.affidavitRecordList.shift();
        that.attemptToSendToDatabase();
    }

    successAtsCb(that, real, data) {
        if (real) {
            // successful save of record..
        }
        // If successful..  attempt to do the next one..
        that.timesheetList.shift();
        that.attemptToSendToDatabase();
    }

    failureCb(that, errStr) {
        // If we fail to save the data.. we wait till next time..

        var dnow = new Date();
        var inow = dnow.getTime();

        if ((inow - that.lastWarning) < that.MIN_SAVE_WAIT_TIME) {
            return;
        }

        let alert = that.alertCtrl.create({
            title: 'Error Saving Voter Data',
            subTitle: 'We will keep attempting to save the data each time, but make sure you flush the data before logging out!',
            buttons: ['OK']
        });
        alert.present();
        return;
    }

    sendInitialVoteRecord(passedOfficevoterecord, mandatory) {
        if (this.inilist == null) {
            this.inilist = new Array();
            this.mandatoryList = new Array();
        }
        this.inilist.push(passedOfficevoterecord);
        this.mandatoryList.push(mandatory);
        console.log(this.mandatoryList);
    }

    // Safe Logout Method to replace rest-service version.. which SHOULD NOT BE USED.
    onLogout(comp:any, errorcb, successcb){
        if (this.needsFlush()) {
            this.attemptToSendToDatabase();
            errorcb(comp,'Logout Failure',
                    'Voter Data has not been saved to the database. Attemping now.. please try logout again, in a few seconds');
        } else {
            this.restSvc.onLogoutXX(comp,errorcb,successcb);
        }
    }
    // END: From Ovrservice
}
