import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {VoterecordPage} from '../voterecord/voterecord';




@Component({
  templateUrl: 'build/pages/amendmentrecord/amendmentrecord.html',
})
export class AmendmentrecordPage {
incorrectSelection: string;
correctSelection: string;
passcode: string;


  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
    this.navCtrl = navCtrl;
    this.incorrectSelection = null;
  }

//
 onSubmit() {
        var that = this;
        var passcode = null;
        try {
            if (this.passcode == null) {
                let alert = this.alertCtrl.create({
                    title: 'Team lead passcode required.',
                    subTitle: 'Amendment records require a team lead passcode for verification; please ask one of your team leads to enter their code.',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                that.navCtrl.push(VoterecordPage, {
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

 

   