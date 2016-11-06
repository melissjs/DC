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
  passedRecord1: OfficeVoteRecord;
  passedRecord2: OfficeVoteRecord;
  passedRecord3: OfficeVoteRecord;

  constructor(private http: Http, private recordservice: Recordservice, private alertCtrl: AlertController) {
  this.candidate=null;
  this.candidateWriteIn=null;
  this.levelOfSupport=null;
  this.recordservice = recordservice;
  this.ovrlist = OVRLIST;
  }

  // clear all records
  clearAll(){
  this.candidate=null;
  this.candidateWriteIn=null;
  this.levelOfSupport=null;
  }

  // get void OVR
  getVoidOfficeVoteRecord(){
  this.officeVoteRecord = {
  voteRecordKey: null,
  office: null,
  election: null,
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
  }
  return this.electOffice;
  }

// gePres

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


checkFieldsForErrors(){
  // alert if gePres not filled
            if (this.electOffice.inner.office=='President' && this.electOffice.inner.election=='General' &&!this.candidate){
                let alertPR = this.alertCtrl.create({
                title: 'General Election Presidential Vote Required.',
                subTitle: 'Please select Presidential Vote.',
                buttons: ['OK']
                });
            alertPR.present();
            return;
            }

            // alert if other but no write in
            if (this.candidate=='26' && !this.candidateWriteIn){
                let alertPR = this.alertCtrl.create({
                title: 'Please write in candidate name.',
                subTitle: 'When selecting "other" please write in candidate name.',
                buttons: ['OK']
                });
            alertPR.present();
            return;
            }

}

// not using
fillRecord(){
            // logic for candidate
            if (this.candidate=='26' && this.candidateWriteIn){
              this.candidate = this.candidateWriteIn;
            }


            // fill ovr record with 
                this.officeVoteRecord = this.getVoidOfficeVoteRecord();

                this.officeVoteRecord = {
                voteRecordKey: null,
                office: this.electOffice.inner.office,
                election: this.electOffice.inner.election,
                success: !this.recordservice.getNonVoteBool(),
                candidate: this.candidate,
                levelOfSupport: this.levelOfSupport,
                }
                console.log(this.officeVoteRecord);
                console.log("from ovr " + this.officeVoteRecord);
}

setOVRRecord(passedRecord, passedDifVar){
if (passedDifVar == 'passedRecord1'){
  this.passedRecord1 = passedRecord;
}
if (passedDifVar == 'passedRecord2'){
  this.passedRecord2 = passedRecord;
}
if (passedDifVar == 'passedRecord3'){
  this.passedRecord3 = passedRecord;
}

}

addEligibleOVRRecordsToList(){
  if (this.passedRecord1.success || this.passedRecord1.candidate || this.passedRecord1.levelOfSupport) {
  this.addOVRToList(this.passedRecord1);
  }

   if (this.passedRecord2.success || this.passedRecord2.candidate || this.passedRecord2.levelOfSupport) {
  this.addOVRToList(this.passedRecord2);
  }

   if (this.passedRecord3.success || this.passedRecord3.candidate || this.passedRecord3.levelOfSupport) {
  this.addOVRToList(this.passedRecord3);
  }
}

addOVRToList(passedOfficevoterecord){
this.ovrlist.push(passedOfficevoterecord);
console.log("list from ovr whole record");
console.log(this.ovrlist);
}


}

