import { Component , Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Candidate } from '../../candidate';
import { OfficeVoteRecord } from '../../officevoterecord';
import { Recordservice } from '../../providers/recordservice/recordservice';
import {Ovrservice} from '../../providers/ovrservice/ovrservice';
import { Electoffice } from '../../electoffice';


@Component({
  selector: 'ovr-component',
  templateUrl: 'build/components/ovr-component/ovr-component.html',
  inputs: ['electThisOffice'],
})
export class OvrComponent {

  @Input() electThisOffice;
  choosenCandidate: string;
  officevoterecord: OfficeVoteRecord;
  //recordservice: Recordservice;
  successfullyElected: boolean;
  levelOfSupport: string;
  writeInCandidate: string;
  //electThisOffice: Electoffice;

  constructor(private recordservice: Recordservice, public alertCtrl: AlertController, private ovrservice: Ovrservice) {
    this.officevoterecord = this.recordservice.getVoidOfficeVoteRecord();
    this.successfullyElected = false;
    this.levelOfSupport = null;
    this.writeInCandidate = null;
    this.choosenCandidate = null;
    this.ovrservice = ovrservice;
  }

onChangeChoice(candidateChoice){
  this.choosenCandidate = candidateChoice;
    console.log(this.choosenCandidate);

}

onChangeCandidateVoteWriteIn(candidateVoteWriteIn){
  this.choosenCandidate = candidateVoteWriteIn;
}

onChangeLos(passedLos){
  this.levelOfSupport = passedLos;
}

// function called from host page onSubmit
public fillOfficeVoteRecord(){

  //logic for successful vote vs intended vote
if (this.electThisOffice.election=='General' && this.recordservice.getNonVoteBool()){
  this.successfullyElected = false;
} else if (this.electThisOffice.election=='Primary' && !this.recordservice.getPrimarySuccess()){
  this.successfullyElected = false;
} else {
  this.successfullyElected = true;
}

// logic for write in candidate
if (this.choosenCandidate=='26' && this.writeInCandidate){
  this.choosenCandidate = this.writeInCandidate;

}

// alert for choosing President && !this.writeInCandidate && this.electThisOffice=="PRESIDENT"
if (this.choosenCandidate=='26' ){
   let alertP = this.alertCtrl.create({
                    title: 'President and cast by selections are required.',
                    subTitle: 'Please select the candidate you voted for today and specify how you cast your vote, everything else on this page is optional.',
                    buttons: ['OK']
                });
                        alertP.present();
                        return;
}


// alert for write in if none
if (this.choosenCandidate=='26' && !this.writeInCandidate){
   let alert = this.alertCtrl.create({
                            //title: 'Please write in Primary Presidential Vote.',
                            subTitle: 'Please Write in Candidate Name.',
                            buttons: ['OK']
                            });
                        alert.present();
                        return;
}

  // fill object
this.officevoterecord = {
voteRecordKey: null,
office: this.electThisOffice.office,
election: this.electThisOffice.election,
success: this.successfullyElected,
candidate: this.choosenCandidate,
levelOfSupport: this.levelOfSupport,
}

}

}
