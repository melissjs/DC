import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {AmendmentRecord} from '../../amendmentrecord';


@Component({
  templateUrl: 'build/pages/amendmentrecord/amendmentrecord.html',
})
export class AmendmentrecordPage {
incorrectSelection: string;
incorrectSelectionWriteIn: string;
correctSelection: string;
correctSelectionWriteIn: string;
affirm: boolean;
authenticatingVolunteerEmail: string;
authenticatingVolunteerPasscode: string;
originatingVolunteerPasscode: string;
volunteerservice: Volunteerservice;
newAmendmentRecord: AmendmentRecord;
recordservice: Recordservice;
authenticatingVolunteerKey: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, volunteerservice: Volunteerservice, recordservice: Recordservice) {
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;
    this.incorrectSelection = null;
    this.incorrectSelectionWriteIn = null;
    this.correctSelection = null;
    this.correctSelectionWriteIn = null;
    this.affirm = false;
    this.authenticatingVolunteerEmail = null;
    this.authenticatingVolunteerPasscode = null;
    this.originatingVolunteerPasscode = null;
    this.recordservice = recordservice;
    this.newAmendmentRecord = this.recordservice.createVoidAmendmentRecord();
    this.authenticatingVolunteerKey = null;
  }

onChangeIncorrectSelection(value){
    this.incorrectSelection = value;
}

onChangeIncorrectSelectionWriteIn(value){
    this.incorrectSelectionWriteIn = value;
}

onChangeCorrectSelection(value){
    this.correctSelection = value;
}

onChangeCorrectSelectionWriteIn(value){
    this.correctSelectionWriteIn = value;
}

onChangeAffirmation(value){
    var newval = !value;
    this.affirm = newval;
}

 onChangeAuthenticatingVolunteerEmail(value){
    this.authenticatingVolunteerEmail = value;
}

 onChangeAuthenticatingVolunteerPasscode(value){
    this.authenticatingVolunteerPasscode = value;
}

 onChangeOriginatingVolunteerPasscode(value){
    this.originatingVolunteerPasscode = value;
}
  


//
 onSubmit() {
        var that = this;
        var passcode = null;
        try {
            if ((this.authenticatingVolunteerPasscode, this.incorrectSelection, this.correctSelection, this.authenticatingVolunteerEmail, this.authenticatingVolunteerPasscode, this.originatingVolunteerPasscode == null) || this.affirm == false) {
                let alert = this.alertCtrl.create({
                    title: 'All fields required.',
                    subTitle: 'Amendment records require all fields and two way aunthentication for verification; please ask one of your team members to help you verify this record.',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                // verify credentials, get key
                if (this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail).passcode == this.authenticatingVolunteerPasscode){
                this.authenticatingVolunteerKey = this.volunteerservice.getVolunteerByEmail(this.authenticatingVolunteerEmail).volunteerKey;
                } else {
                    let alertEmail = this.alertCtrl.create({
                    title: 'Authenticating Volunteer Credentials Invalid.',
                    subTitle: 'Please re-enter authenticating email and passcode.',
                    buttons: ['OK']
                });
                alertEmail.present();
                return;
                }

                // check originating volunteer passcode
                if (this.volunteerservice.getNewVolunteer().passcode !== this.originatingVolunteerPasscode){
                    let alertPass = this.alertCtrl.create({
                    title: 'Originating Volunteer Passcode Invalid.',
                    subTitle: 'Please re-enter your passcode.',
                    buttons: ['OK']
                });
                alertPass.present();
                return;
                }

                // logic for write ins
                if (this.incorrectSelection=='writeIn'){
                    this.incorrectSelection = this.incorrectSelectionWriteIn;
                }

                if (this.correctSelection=='writeIn'){
                    this.correctSelection = this.correctSelectionWriteIn;
                }

                // fill amendment object
                this.newAmendmentRecord = {
                    volunteerKey: this.volunteerservice.getNewVolunteerKey(),
                    incorrectSelection: this.incorrectSelection,
                    correctSelection: this.correctSelection,
                    authenticatedByKey: this.authenticatingVolunteerKey,
                }
                console.log(this.newAmendmentRecord);

                this.recordservice.addAmendmentRecordToList(this.newAmendmentRecord);
                console.log(this.recordservice.getAmendmentList());

                //navigate
                let alertSuccess = this.alertCtrl.create({
                    title: 'Successfully Submitted.',
                    subTitle: 'You have successfully created the amendment record.',
                    buttons: ['OK']
                });
                alertSuccess.present();
                that.navCtrl.setRoot(VoterecordPage, {
                });
            }

        } catch (EE) {
            let alert = this.alertCtrl.create({
                title: 'error in Submitting',
                subTitle: EE.toString(),
                buttons: ['OK']
            });
            alert.present();
            console.log('error in Submitting, exc='+ EE.toString())
        }
    }
//
}

 

   