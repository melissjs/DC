import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, AlertController } from 'ionic-angular';
import { OfficeVoteRecord } from '../../officevoterecord';
import { Recordservice } from '../recordservice/recordservice';
import { ElectOfficeGUI } from '../../electofficegui';


@Injectable()
export class Ovrservice {
  officeVoteRecord: OfficeVoteRecord;
  candidate:string;
  candidateWriteIn:string;
  levelOfSupport:string;
  electOffice: ElectOfficeGUI;

  constructor(private http: Http, private recordservice: Recordservice, private alertCtrl: AlertController) {
  this.candidate=null;
  this.candidateWriteIn=null;
  this.levelOfSupport=null;
  this.recordservice = recordservice;
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


checkFields(){
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




}

