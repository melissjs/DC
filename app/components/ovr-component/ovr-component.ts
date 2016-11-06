import { Component , Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Candidate } from '../../candidate';
import { OfficeVoteRecord } from '../../officevoterecord';
import { Recordservice } from '../../providers/recordservice/recordservice';
import {Ovrservice} from '../../providers/ovrservice/ovrservice';
//import { ElectOffice } from '../../electoffice';
//import { ElectOfficeGUI } from '../../electofficegui';


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
  difVar: string;
  //electThisOffice: ElectOfficeGUI;

  constructor(private recordservice: Recordservice, public alertCtrl: AlertController, private ovrservice: Ovrservice) {
    //this.officevoterecord = this.recordservice.getVoidOfficeVoteRecord();
    //this.successfullyElected = false;
    this.levelOfSupport = null;
    this.writeInCandidate = null;
    this.choosenCandidate = null;
    this.difVar = null;
    this.ovrservice = ovrservice;
  }

onChangeChoice(candidateChoice){
  this.choosenCandidate = candidateChoice;
    console.log(this.choosenCandidate);


// logic creating differntiation var
if (this.electThisOffice.election=="General" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord1';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord2';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="Congress"){
this.difVar = 'passedRecord3';
}

// logic
if(this.electThisOffice.election=="General" && !this.recordservice.getNonVoteBool()){
  this.successfullyElected = true;
} else if (this.electThisOffice.election=="Primary" && this.recordservice.getPrimarySuccess()){
this.successfullyElected = true;
}
// fill
    this.officevoterecord = {
      voteRecordKey: null,
      office: this.electThisOffice.inner.office,
      election: this.electThisOffice.inner.election,
      success: this.successfullyElected,
      candidate: this.choosenCandidate,
      levelOfSupport: this.levelOfSupport,
    }
                                                    //console.log("from comp ");
                                                    //console.log(this.officevoterecord);

  // send
  this.ovrservice.setOVRRecord(this.officevoterecord, this.difVar);
 

}

onChangeCandidateVoteWriteIn(candidateVoteWriteIn){
  if(candidateVoteWriteIn){
  this.writeInCandidate = candidateVoteWriteIn;
  this.choosenCandidate = candidateVoteWriteIn
}
  //this.ovrservice.setCandidateWriteIn(candidateVoteWriteIn);
  console.log(this.choosenCandidate);
  //console.log(candidateVoteWriteIn);

  
// logic creating differntiation var
if (this.electThisOffice.election=="General" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord1';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord2';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="Congress"){
this.difVar = 'passedRecord3';
}

// logic
if(this.electThisOffice.election=="General" && !this.recordservice.getNonVoteBool()){
  this.successfullyElected = true;
} else if (this.electThisOffice.election=="Primary" && this.recordservice.getPrimarySuccess()){
this.successfullyElected = true;
}
// fill
    this.officevoterecord = {
      voteRecordKey: null,
      office: this.electThisOffice.inner.office,
      election: this.electThisOffice.inner.election,
      success: this.successfullyElected,
      candidate: this.choosenCandidate,
      levelOfSupport: this.levelOfSupport,
    }
                                            //console.log("from comp ");
                                          //console.log(this.officevoterecord);

  // send
  this.ovrservice.setOVRRecord(this.officevoterecord, this.difVar);

}

onChangeLos(passedLos){
  this.levelOfSupport = passedLos;
  console.log(this.levelOfSupport);
  this.ovrservice.setLos(passedLos);
  console.log("from service" + this.ovrservice.getLos());

  
// logic creating differntiation var
if (this.electThisOffice.election=="General" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord1';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="President"){
this.difVar = 'passedRecord2';
}
if (this.electThisOffice.election=="Primary" && this.electThisOffice.office=="Congress"){
this.difVar = 'passedRecord3';
}

// logic
if(this.electThisOffice.election=="General" && !this.recordservice.getNonVoteBool()){
  this.successfullyElected = true;
} else if (this.electThisOffice.election=="Primary" && this.recordservice.getPrimarySuccess()){
this.successfullyElected = true;
}
// fill
    this.officevoterecord = {
      voteRecordKey: null,
      office: this.electThisOffice.inner.office,
      election: this.electThisOffice.inner.election,
      success: this.successfullyElected,
      candidate: this.choosenCandidate,
      levelOfSupport: this.levelOfSupport,
    }
                                                    //console.log("from comp ");
                                                    //console.log(this.officevoterecord);

  // send
  this.ovrservice.setOVRRecord(this.officevoterecord, this.difVar);

}





}
