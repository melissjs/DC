import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {DemographicsPage} from '../demographics/demographics';

@Component({
  templateUrl: 'build/pages/vote/vote.html'
})
export class VotePage {
    presVote: string;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController) {
        this.navCtrl = navCtrl;
        this.presVote = null;
    }

    onSubmit() {
        var that = this;
        try {
            if (this.presVote == null) {
                let alert = this.alertCtrl.create({
                    title: 'No Presidential Vote Selected!',
                    subTitle: 'Please Make a Selection',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                that.navCtrl.push(DemographicsPage, {
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

    onChangePresVote(value){
        this.presVote = value;
   }

}
