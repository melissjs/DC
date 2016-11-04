import { Component , Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Candidate } from '../../candidate';
import { Officevoterecord } from '../../officevoterecord';
import { Recordservice } from '../../providers/recordservice/recordservice';
import { Electoffice } from '../../electoffice';


@Component({
  selector: 'ovr-component',
  templateUrl: 'build/components/ovr-component/ovr-component.html',
  inputs: ['electThisOffice'],
})
export class OvrComponent {

  @Input() electThisOffice;
  choosenCandidate: string;
  officevoterecord: Officevoterecord;
  //recordservice: Recordservice;
  successfullyElected: boolean;
  levelOfSupport: string;
  writeInCandidate: string;
  //electThisOffice: Electoffice;

  constructor(private recordservice: Recordservice, public alertCtrl: AlertController) {
    this.officevoterecord = this.recordservice.getVoidOfficeVoteRecord();
    this.successfullyElected = false;
    this.levelOfSupport = null;
    this.writeInCandidate = null;
  }

onChangeChoice(passedCand){
  this.choosenCandidate = passedCand;
}

onChangeLos(passedLos){
  this.levelOfSupport = passedLos;
}

// function called from host page onSubmit
fillOfficeVoteRecord(){

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
