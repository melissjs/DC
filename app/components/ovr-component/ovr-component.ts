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
      // bug here.. this component appears to be called from somewhere with no
      // initial parameter value.. ??
      if (!this.checkInitOfficeVoteRecord('initializing'))  {

      }
  }

    checkInitOfficeVoteRecord(setting) {
        if (this.officevoterecord == null) {
            if (this.electThisOffice != null) {
                this.officevoterecord = {
                    voteRecordKey: this.recordservice.getVoteRecordKey(),
                    electOfficeKey: this.electThisOffice.inner.electOfficeKey,
                    success: false,           // will get set by vote.ts call to ovrservice.
                    candidate: null,
                    levelOfSupport: null,
                }
                this.ovrservice.sendInitialVoteRecord(this.officevoterecord, this.electThisOffice.inner.mandatory);
            } else {
                if (setting == 'initializing') {
                    console.log('ERROR: Spurious call to ovr-component with no parameter specified!');
                } else {
                    console.log('ERROR: Spurious call to set ' + setting + ' in ovr-component without any parameter sent to component');
                }
                return false;
            }
        }
        return true;
    }

onChangeChoice(candidateChoice){
    this.choosenCandidate = candidateChoice;
    if (!this.checkInitOfficeVoteRecord('candidateChoice')) {
        return;
    }
    this.officevoterecord.candidate = this.choosenCandidate;
/*
MOVED THIS LOGIC TO ovrservice to remove dependency on recordservice here.
// logic
if(this.electThisOffice.election=="General" && !this.recordservice.getNonVoteBool()){
  this.successfullyElected = true;
} else if (this.electThisOffice.election=="Primary" && this.recordservice.getPrimarySuccess()){
this.successfullyElected = true;
}
*/
    this.officevoterecord.success = true; // may be changed by ovrservice.
    console.log(this.choosenCandidate);

  // send
    this.ovrservice.setOVRRecord(this.officevoterecord);
 

}

onChangeCandidateVoteWriteIn(candidateVoteWriteIn){
    if (!this.checkInitOfficeVoteRecord('candidateVoteWriteIn')) {
        return;
    }

    if(candidateVoteWriteIn){
        this.writeInCandidate = candidateVoteWriteIn;
        this.onChangeChoice(candidateVoteWriteIn);
    }
}

onChangeLos(passedLos){
    if (!this.checkInitOfficeVoteRecord('levelOfSupport')) {
        return;
    }

    this.levelOfSupport = passedLos;
    console.log(this.levelOfSupport);
    this.officevoterecord.levelOfSupport = this.levelOfSupport;
    this.officevoterecord.success = true; // may be changed by ovrservice.

/*
MOVED THIS LOGIC TO ovrservice to remove dependency on recordservice here.
// logic
if(this.electThisOffice.election=="General" && !this.recordservice.getNonVoteBool()){
  this.successfullyElected = true;
} else if (this.electThisOffice.election=="Primary" && this.recordservice.getPrimarySuccess()){
this.successfullyElected = true;
}
*/
    this.ovrservice.setOVRRecord(this.officevoterecord);

}

}
