import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';
import {Recordservice} from '../../providers/recordservice/recordservice';
import {RestService} from '../../providers/rest-service/rest-service';
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
authenticatingVolunteerKey: string;
authenticatingVolunteerPasscode: string;
originatingVolunteerPasscode: string;
volunteerservice: Volunteerservice;
newAmendmentRecord: AmendmentRecord;
recordservice: Recordservice;
restSvc: RestService;
voteRecordKey: string;

    constructor(private navCtrl: NavController, 
                private alertCtrl: AlertController, volunteerservice: Volunteerservice,
                recordservice: Recordservice, restSvc: RestService) {
    this.navCtrl = navCtrl;
    this.volunteerservice = volunteerservice;
    this.incorrectSelection = null;
    this.incorrectSelectionWriteIn = null;
    this.correctSelection = null;
    this.correctSelectionWriteIn = null;
    this.affirm = false;
    this.authenticatingVolunteerPasscode = null;
    this.originatingVolunteerPasscode = null;
    this.recordservice = recordservice;
    this.newAmendmentRecord = this.recordservice.createVoidAmendmentRecord();
    this.authenticatingVolunteerKey = null;
    this.restSvc = restSvc;
    this.voteRecordKey = null;
  }

onChangeVRK(value){
    this.voteRecordKey = value;
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

 onChangeAuthenticatingVolunteerKey(value){
    this.authenticatingVolunteerKey = value;
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
            if (!this.incorrectSelection || !this.correctSelection || !this.authenticatingVolunteerKey ||!this.authenticatingVolunteerPasscode || !this.originatingVolunteerPasscode || !this.affirm) {
                let alert = this.alertCtrl.create({
                    title: 'All fields required.',
                    subTitle: 'Amendment records require all fields and two way authentication for verification; please ask one of your team members to help you verify this record.',
                    buttons: [{
                        text: 'OK',
                        handler: () => {
                            alert.dismiss();
                        }
                    }]
                });
                setTimeout(()=>{
                    alert.present();
                },250);
            } else {

                this.restSvc.verifyExtraLogin
                (this.authenticatingVolunteerKey, this.authenticatingVolunteerPasscode, true,
                 this.avSuccessCb, this.avFailureCb, this);
            }

        } catch (EE) {
            let alert = this.alertCtrl.create({
                title: 'error in Submitting',
                subTitle: EE.toString(),
                    buttons: [{
                        text: 'OK',
                        handler: () => {
                            alert.dismiss();
                        }
                    }]
            });
            setTimeout(()=>{
                alert.present();
            },250);
            console.log('error in Submitting, exc='+ EE.toString())
        }
 }

    filterInt = function (value) {
        if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }

    avSuccessCb(that:any, real: boolean, data: any) {
        if (!real) {
            // no op
        }
        if (!that.restSvc.matchesPasscode(that.originatingVolunteerPasscode)) {
            let alertPass = that.alertCtrl.create({
                title: 'Originating Volunteer Passcode Invalid.',
                subTitle: 'Please re-enter your passcode.',
                buttons: ['OK']
            });
            alertPass.present();
            return;
        }
        // logic for write ins
        if (that.incorrectSelection=='writeIn'){
            that.incorrectSelection = that.incorrectSelectionWriteIn;
        }

        if (that.correctSelection=='writeIn'){
            that.correctSelection = that.correctSelectionWriteIn;
        }

        // fill amendment object
        that.newAmendmentRecord = {
            voteRecordKey: that.voteRecordKey,
            volunteerKey: that.volunteerservice.getNewVolunteerKey(),
            incorrectSelection: that.incorrectSelection,
            correctSelection: that.correctSelection,
            authenticatedByKey: that.authenticatingVolunteerKey,
        }
        console.log(that.newAmendmentRecord);

        that.recordservice.addAmendmentRecordToList(that.newAmendmentRecord);
        console.log(that.recordservice.getAmendmentList());
        //navigate
        let alertSuccess = that.alertCtrl.create({
            title: 'Successfully Submitted.',
            subTitle: 'You have successfully created the amendment record.',
            buttons: [{
                text: 'OK',
                handler: () => {
                    alertSuccess.dismiss();
                }
            }]
        });
        setTimeout(()=>{
            alertSuccess.present();
        },250);
        that.navCtrl.setRoot(VoterecordPage, {
        });

    }

    avFailureCb(that:any, err: any) {
        var title = err._body;
        var subtitle;
        switch (err.status) {
        case 412: // HttpStatus.PRECONDITION_FAILED
            // title = 'Authentication cannot be done with only one volunteer.';
            subtitle = 'Please ask a team member to help you authenticate this record by entering their key and passcode.';
            break;
        case 424:
            // title = 'User is not activated!'
            subtitle = 'This user has not verified their email address, or has been deactivated.';
            break;
        case 400:
            // Authentication Failure.
            break;
        }
        let alertOne = that.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alertOne.present();
        return;
    }

    amSuccessCb(that:any, real: boolean, data: any) {
        if (!real) {
            // act like success anyway..
        }
        let alertOne = that.alertCtrl.create({
            title: 'Successful Save of Amendment Record',
            buttons: ['OK']
        });
        alertOne.present();
    }


}
