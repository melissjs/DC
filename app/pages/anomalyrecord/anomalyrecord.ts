import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AnomalyRecord} from '../../anomalyrecord'
import {Recordservice} from '../../providers/recordservice/recordservice';
import {Volunteerservice} from '../../providers/volunteerservice/volunteerservice';
import {VoterecordPage} from '../voterecord/voterecord';

/*
  Generated class for the AnomalyrecordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/anomalyrecord/anomalyrecord.html',
})
export class AnomalyrecordPage {
nature: string;
fullName: string;
emailAddress: string;
comments: string;
evidence: boolean;
newAnomalyRecord: AnomalyRecord;
recordservice: Recordservice;
volunteerservice: Volunteerservice;

constructor(private navCtrl: NavController, recordservice: Recordservice, volunteerservice: Volunteerservice, private alertCtrl: AlertController) {
this.navCtrl = navCtrl;
this.nature = null;
this.fullName = null;
this.emailAddress = null;
this.comments = null;
this.evidence = null;
this.recordservice = recordservice;
this.volunteerservice = volunteerservice;
this.newAnomalyRecord = this.recordservice.createVoidAnomalyRecord();
  }

onChangeNature(value){
this.nature = value;
}

onChangeFullName(value){
this.fullName = value;
}

onChangeEmailAddress(value){
this.emailAddress = value;
}

onChangeComments(value){
this.comments = value;
}

onChangeEvidence(value){
this.evidence = value;
}

onSubmit(){
    if (this.nature == null) {
        let alert = this.alertCtrl.create({
            title: 'Nature of anomaly is required.',
            subTitle: 'Please specify the nature of the anomaly, everything else on this page is optional.',
            buttons: [{
                text: 'OK',
                handler: () => {
                    alert.dismiss();
                }
            }]
        });
        //timeout the error to let other modals finish dismissing.
        setTimeout(()=>{
            alert.present();
        },250);
    } else {


        var that = this;
        // fill anomaly obj
        this.newAnomalyRecord ={
            volunteerKey: this.volunteerservice.getNewVolunteerKey(),
            nature: this.nature,
            fullName: this.fullName,
            emailAddress: this.emailAddress,
            comments: this.comments,
            evidence: (this.evidence != null),
        }
        console.log(this.newAnomalyRecord);
        this.recordservice.addAnomalyRecordToList(this.newAnomalyRecord);
        console.log(this.recordservice.getAnomalyList());


        // nav to voterecord
        try {that.navCtrl.setRoot(VoterecordPage, {})}
        catch (EE) {console.log('error in Submitting, exc='+ EE.toString())}
    }
}

}
