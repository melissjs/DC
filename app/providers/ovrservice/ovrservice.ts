import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, AlertController } from 'ionic-angular';
import { OfficeVoteRecord } from '../../officevoterecord';
import { Recordservice } from '../recordservice/recordservice';
import { ElectOfficeGUI } from '../../electofficegui';
import { OVRLIST } from '../../fakedatama'


@Injectable()
export class Ovrservice {
  officeVoteRecord: OfficeVoteRecord;
  candidate:string;
  candidateWriteIn:string;
  levelOfSupport:string;
  electOffice: ElectOfficeGUI;
  ovrlist: OfficeVoteRecord[];
  inilist: OfficeVoteRecord[];
    mandatoryList: boolean[];

  constructor(private http: Http, private recordservice: Recordservice, private alertCtrl: AlertController) {
  this.candidate=null;
  this.candidateWriteIn=null;
  this.levelOfSupport=null;
  this.recordservice = recordservice;
  this.ovrlist = null; // OVRLIST;
      this.inilist = null;
  }

  // get void OVR
  getVoidOfficeVoteRecord(){
  this.officeVoteRecord = {
  voteRecordKey: null,
  electOfficeKey: null,
  success: false,
  candidate: null,
  levelOfSupport: null,
  }
  return this.officeVoteRecord;
  }

    // get void ElectOffice
  getVoidElectOffice(){
      this.electOffice = {
          inner: null,
          candidates: [],
          mandatory: false
  }
  return this.electOffice;
  }

// gePres

/*
setCandidate(passedString){
this.candidate = passedString;
}


getCandidate(){
return this.candidate;
}

setCandidateWriteIn(passedString){
this.candidateWriteIn = passedString;
}


getCandidateWriteIn(){
return this.candidateWriteIn;
}

setLos(passedString){
this.levelOfSupport = passedString;
}


getLos(){
return this.levelOfSupport;
}

setElectOffice(passedElectOffice){
this.electOffice = passedElectOffice;
}
*/

checkFieldsForErrors(){
  // alert if gePres not filled
    var retmsg = null;
    if (this.inilist != null) {
        var ii;
        for (ii=0;ii<this.inilist.length;ii++) {
            var ofr = this.inilist[ii];
            if ((this.mandatoryList[ii]) && (!ofr.candidate)) {
                if (retmsg = null) {
                    retmsg = '';
                } else {
                    retmsg = retmsg + ', and ';
                }
                retmsg = retmsg + ofr.electOfficeKey +  ' Vote Required.';
            }
            if (ofr.candidate == '26') {
                if (retmsg = null) {
                    retmsg = '';
                } else {
                    retmsg = retmsg + ', and ';
                }
                retmsg = retmsg + ofr.electOfficeKey + 
                    ' When selecting other please write in candidate name.'
            }
        }
    }
    return retmsg;
}

// not using
fillRecordXX(){
            // logic for candidate
            if (this.candidate=='26' && this.candidateWriteIn){
              this.candidate = this.candidateWriteIn;
            }


            // fill ovr record with 
                this.officeVoteRecord = this.getVoidOfficeVoteRecord();

                this.officeVoteRecord = {
                voteRecordKey: null,
                electOfficeKey: this.electOffice.inner.electOfficeKey,
                success: !this.recordservice.getNonVoteBool(),
                candidate: this.candidate,
                levelOfSupport: this.levelOfSupport,
                }
                console.log(this.officeVoteRecord);
                console.log("from ovr " + this.officeVoteRecord);
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
    }


addEligibleOVRRecordsToList(){
    if (this.inilist != null) {
        var ii;
        for (ii=0;ii<this.inilist.length;ii++) {
            var ofr = this.inilist[ii];
            if( (ofr.electOfficeKey.startsWith("President")) && (this.recordservice.getNonVoteBool())) {
                // switch to false..
                ofr.success = false;
            }
            if (ofr.success || ofr.candidate || ofr.levelOfSupport) {
                this.addOVRToList(ofr);         
            }
        }
        // since we added them.. remove from inilist
        this.inilist = null;
    }
}


    sendInitialVoteRecord(passedOfficevoterecord, mandatory) {
        if (this.inilist == null) {
            this.inilist = new Array();
            this.mandatoryList = new Array();
        }
        this.inilist.push(passedOfficevoterecord);
        this.mandatoryList.push(mandatory);
    }
}

