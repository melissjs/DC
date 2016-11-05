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
  //electThisOffice: ElectOfficeGUI;

  constructor(private recordservice: Recordservice, public alertCtrl: AlertController, private ovrservice: Ovrservice) {
    //this.officevoterecord = this.recordservice.getVoidOfficeVoteRecord();
    //this.successfullyElected = false;
    this.levelOfSupport = null;
    this.writeInCandidate = null;
    this.choosenCandidate = null;
    this.ovrservice = ovrservice;
  }

onChangeChoice(candidateChoice){
  this.choosenCandidate = candidateChoice;
    console.log(this.choosenCandidate);
    this.ovrservice.setCandidate(candidateChoice);

    this.ovrservice.setElectOffice(this.electThisOffice);

}

onChangeCandidateVoteWriteIn(candidateVoteWriteIn){
  this.choosenCandidate = candidateVoteWriteIn;
  this.ovrservice.setCandidateWriteIn(candidateVoteWriteIn);
  console.log(this.choosenCandidate);
  console.log(candidateVoteWriteIn);

  this.ovrservice.setElectOffice(this.electThisOffice);

}

onChangeLos(passedLos){
  this.levelOfSupport = passedLos;
  console.log(this.levelOfSupport);
  this.ovrservice.setLos(passedLos);
  console.log("from service" + this.ovrservice.getLos());

  this.ovrservice.setElectOffice(this.electThisOffice);

}





}
